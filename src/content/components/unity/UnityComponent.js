import React, { Component } from "react";
import Unity, { UnityContent } from "react-unity-webgl";
import "./../../../styles/styles.css";
import { Progress } from "reactstrap";

// import UnityLocker from "./UnityLocker";

/* REWORK THE WHOLE APPROACH */
// The main Unity Component should be strapped to the bare minimum
// Unity should handle fetching of main scenes on its owwn

var webglContainer = {
  width: "100%",
  position: "relative",
  paddingBottom: "56.25%"
};

var webglContent = {
  position: "absolute",
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",
  zIndex: "1"
};

var loaderContent = {
  position: "absolute",
  width: "50%",
  top: "50%",
  left: "25%",
  zIndex: "2"
};

class UnityComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      loaderPercentage: 0
    };

    this.unityContent = new UnityContent(
      "/UnityBuild/DefaultBuild.json",
      "/UnityBuild/UnityLoader.js"
    );

    this.unityContent.on("progress", progression => {
      this.setState({
        loaderPercentage: parseFloat(progression * 100).toFixed(0)
      });
    });

    this.unityContent.on("loaded", () => {
      this.setState({
        isLoaded: true
      });
    });
  }

  lockChangeAlert = () => {
    if (
      // if pointer lock is disabled (null) then lock the screen
      document.pointerLockElement === null ||
      document.mozPointerLockElement === null
    ) {
      this.unityContent.send("ScreenLocker", "WorldPause");
    }
  };

  componentDidMount() {
    if ("onpointerlockchange" in document) {
      document.addEventListener(
        "pointerlockchange",
        this.lockChangeAlert,
        false
      );
    } else if ("onmozpointerlockchange" in document) {
      document.addEventListener(
        "mozpointerlockchange",
        this.lockChangeAlert,
        false
      );
    }
  }

  render() {
    let Loader = !this.state.isLoaded ? (
      <div style={loaderContent}>
        <Progress
          animated
          color="danger"
          value={
            this.state.loaderPercentage > 10 ? this.state.loaderPercentage : 10
          }
        >{`${this.state.loaderPercentage}%💨`}</Progress>
      </div>
    ) : null;

    return (
      <div className="container">
        <div style={webglContainer}>
          <div style={webglContent}>
            <Unity
              unityContent={this.unityContent}
              onProgress={this.onProgress}
            />
          </div>
          {Loader}
        </div>
      </div>
    );
  }
}

export default UnityComponent;
