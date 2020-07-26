import React, { useContext, useState } from 'react';
import { AnimationFrameContext, UNIFORM, Canvas, Clear, Mesh, Program, Uniform } from 'react-glc';
import ErrorBoundary from './ErrorBoundary';

const vertexShader = `precision mediump float;
  attribute vec3 aPosition;
  void main() {
    gl_Position =  vec4(aPosition, 1.0);
  }`;

const fragmentShader = `precision mediump float;
  uniform float uTime;
  uniform vec2 uResolution;
  void main() {
    gl_FragColor = vec4(gl_FragCoord.x/uResolution.x ,gl_FragCoord.y/uResolution.y,sin(uTime),1.0);
  }`;

const res = new Float32Array([400, 400]);
const vertices = new Float32Array([-1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0, -1.0, 1.0, 0.0]);
const attributesData = { aPosition: vertices };
const indices = new Uint16Array([0, 1, 2, 0, 2, 3]);
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

const Plane = () => {

    return <Mesh attributesData={attributesData} indices={indices} drawMode="TRIANGLES" />
}

const FragmentProgram = ({ children, fragmentSource }) => {
    const { time } = useContext(AnimationFrameContext);

    return <Program attributes={attributes} fragment={fragmentSource} vertex={vertexShader}>
        <Uniform name="uTime" type={UNIFORM.FLOAT1} value={time} />
        <Uniform name="uResolution" type={UNIFORM.FLOAT2} value={res} />
        <Clear />
        {children}
    </Program>
}

export const Viewer = ({fragmentSource}) => {
    return <ErrorBoundary fragmentSource={fragmentSource}><Canvas width={400} height={400} animated>
        <FragmentProgram fragmentSource={fragmentSource} >
            <Plane />
        </FragmentProgram>
    </Canvas></ErrorBoundary>
}