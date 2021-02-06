import React from 'react';

import { LiveEditor } from './LiveEditor';

import './index.css'

const defaultSdf = `float sdf(vec3 point) {
  return length(point) - 1.;
}`;

const bcode = `
float sdBox(vec3 p, vec3 s) {
  p = abs(p)-s;
  return length(max(p, 0.))+min(max(p.x, max(p.y, p.z)), 0.);
}

float getSceneDist(vec3 p) {
  float d = sdBox(p, vec3(1));
   
  return d;
}
`;

const App = ({code, sdf, customScene}) => {

  return <div>
    {sdf && <LiveEditor initialCode={code ? code : defaultSdf} />}
    {(sdf && customScene) && <br/>}
    {customScene && <LiveEditor customScene initialCode={code ? code : bcode} />}
  </div>
};

export default App;
