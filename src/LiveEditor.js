import React, { useContext, useState, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
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
  const [code, setCode] = useState(initialCode);

  return (
    <div style={{ background: "#2d2d2d", padding: 8, display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
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
      </div>
      <Viewer fragmentSource={ray.replace("%_SDF_%", code + (customScene ? "" : defaultSceneDistFn))} />
    </div>
  );
}
