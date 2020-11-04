import React, {useState, useCallback } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-glsl';

import { Viewer } from './viewer';

import ray from './ray.glsl';

const defaultSceneDistFn = `
float getSceneDist(vec3 p) {
  float d = sdf(p);
   
  return d;
}
`;

export const LiveEditor = ({ initialCode, height = 500, customScene = false }) => {
  const [copied, setCopied] = useState(false);
  const [code, setCode] = useState(initialCode);
  const share = useCallback(
    () => {
      const baseUrl = `${window.location.origin}${window.location.pathname}`;
      const shareUrl = `${baseUrl}?code=${btoa(code)}&type=${customScene ? 'customScene' : 'sdf'}`;

      const el = document.createElement('textarea');
      el.value = shareUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000)
    },
    [customScene, code],
  );

  return (
    <div style={{ background: "#2d2d2d", padding: 8, position: "relative", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
      <div style={{ height, width: "100%", overflow: "auto", marginRight: 8, }}>
        <Editor
          value={code}
          onValueChange={_code => setCode(_code)}
          highlight={_code => highlight(_code, languages.glsl)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
            color: "#ccc",
            width: "100%",
          }}
        />
        <button
          onClick={() => share()}
          style={{ position: "absolute", bottom: 0, right: 0, fontSize: 16, paddingTop: 4, paddingBottom: 4, paddingLeft: 12, paddingRight: 12 }}
        >{copied ? 'Copied' : 'Share'}</button>
      </div>
      <Viewer fragmentSource={ray.replace("%_SDF_%", code + (customScene ? "" : defaultSceneDistFn))} />
    </div>
  );
}
