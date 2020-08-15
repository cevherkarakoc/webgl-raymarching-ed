import React from "react"
import { Mesh } from "react-glc";

const vertices = new Float32Array([-1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0, -1.0, 1.0, 0.0]);
const attributesData = { aPosition: vertices };
const indices = new Uint16Array([0, 1, 2, 0, 2, 3]);

export const Plane = () => {
  return <Mesh attributesData={attributesData} indices={indices} drawMode="TRIANGLES" />
}
