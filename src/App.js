import React, { Component } from "react";
import Unity from "react-unity-webgl";
import "./App.css";
// import "/../TemplateData/style.css";

class App extends Component {
  render() {
    return (
      <Unity src="UnityBuild/build.json" loader="UnityBuild/UnityLoader.js" />
    );
  }
}

export default App;
