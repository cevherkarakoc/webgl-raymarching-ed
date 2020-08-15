import React, { useContext, useState, useEffect } from 'react';
import { AnimationFrameContext, UNIFORM, Canvas, Clear, Program, Uniform, CanvasContext } from 'react-glc';
import { Plane } from './Plane';
import ErrorBoundary from './ErrorBoundary';

const vertexShader = `precision mediump float;
  attribute vec3 aPosition;
  void main() {
    gl_Position =  vec4(aPosition, 1.0);
  }`;

const res = new Float32Array([400, 400]);
const attributes = [
  {
    name: 'aPosition',
    location: 0,
    size: 3,
    // type: gl.FLOAT,
    normalized: false,
    stride: 0,
    offset: 0,
  },
];

const FragmentProgram = ({ children, fragmentSource }) => {
  const { time } = useContext(AnimationFrameContext);
  const gl = useContext(CanvasContext);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(6);
  useEffect(() => {
    gl.canvas.addEventListener("mousemove", (event) => {
      if (event.buttons === 1) {

        setMouse(c => {
          return {
            x: c.x - event.movementX * 0.008,
            y: c.y + event.movementY * 0.005,
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    gl.canvas.addEventListener("wheel", (event) => {
      const dir = Math.sign(event.deltaY);
      setZoom((_zoom) => {
        return Math.max(_zoom + (dir * 0.25), 0.5);
      });
      event.preventDefault();
    });
  }, []);

  return <Program attributes={attributes} fragment={fragmentSource} vertex={vertexShader}>
    <Uniform name="uTime" type={UNIFORM.FLOAT1} value={time} />
    <Uniform name="uResolution" type={UNIFORM.FLOAT2} value={res} />
    <Uniform name="uCamRotation" type={UNIFORM.FLOAT2} value={Float32Array.of(mouse.x, mouse.y)} />
    <Uniform name="uZoom" type={UNIFORM.FLOAT1} value={zoom} />
    <Clear />
    {children}
  </Program>
}

export const Viewer = ({ fragmentSource }) => {
  return <ErrorBoundary fragmentSource={fragmentSource}><Canvas width={400} height={400} animated>
    <FragmentProgram fragmentSource={fragmentSource} >
      <Plane />
    </FragmentProgram>
  </Canvas></ErrorBoundary>
}
