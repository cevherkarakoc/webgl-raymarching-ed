import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-glsl';

import { Viewer } from './viewer';

const code = `precision mediump float;
uniform float uTime;
uniform vec2 uResolution;
void main() {
  vec2 uv = gl_FragCoord.xy/uResolution;
  gl_FragColor = vec4(uv.x ,uv.y,sin(uTime),1.0);
}`;

class App extends React.Component {
  state = { code };

  render() {
    return (
      <div style={{ background: "#2d2d2d", padding: 8, display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <div style={{height: 512, width: "100%", overflow: "auto", marginRight: 8,}}>
        <Editor
          value={this.state.code}
          onValueChange={code => this.setState({ code })}
          highlight={code => highlight(code, languages.glsl)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
            color: "#ccc",
            width: "100%",
          }}
        />
        </div>
        <Viewer fragmentSource={this.state.code} />
      </div>
    );
  }
}

export default App;