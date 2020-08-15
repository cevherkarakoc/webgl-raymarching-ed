import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

import 'prismjs/themes/prism-tomorrow.css';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const type = urlParams.get("type");
const code = urlParams.get("code");

const sdf = type === "customScene" ? false : true;
const customScene = type === "sdf" ? false : true;

ReactDOM.render(
  <App code={code ? atob(code) : null} sdf={sdf} customScene={customScene}/>,
  document.getElementById('app')
);
