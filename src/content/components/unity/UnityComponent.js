import React, { Component } from "react";
import Unity, { UnityContent } from "react-unity-webgl";
import "./../../../styles/styles.css";

import UnityLocker from "./UnityLocker";

/* REWORK THE WHOLE APPROACH */
// The main Unity Component should be strapped to the bare minimum
// Unity should handle fetching of main scenes on its owwn

class UnityComponent extends Component {
  constructor(props) {
    super(props);

    this.onProgress = this.onProgress.bind(this);

    this.state = {
      loadStatus: false,
      loaderText: "0%"
    };

    this.unityContent = new UnityContent(
      "/UnityBuild/DefaultBuild.json",
      "/UnityBuild/UnityLoader.js"
    )
  }

  onProgress(progression) {
    this.setState({ loaderText: `${parseInt(progression * 100)}%` });
    if (progression === 1) {
      this.setState({ loadStatus: true });
    }
  }

  _openMenu() {
    console.log("[test] JS exec from Unity");
  }

  _unityLoaded() {
    this.setState({ loadStatus: true });
    console.log("yay");
  }

  render() {

    console.log(this.unityContent)
    let loader;
    if (this.state.loadStatus === false) {
      loader = (
        <h1 id="loader">
          {this.state.loaderText}
        </h1>
      );
    } else loader = null;

    return (
      <div>
        <div className="webgl-content">
          <Unity
            // src="UnityBuild/DefaultWebGL.json"
            // loader="UnityBuild/UnityLoader.js"
            unityContent={this.unityContent}
            // onProgress={this.onProgress}
          />
        </div>

        {/* <div className="webgl-loader">
          {loader}
        </div> */}

        {/* <UnityLocker loadStatus={this.state.loadStatus} /> */}
      </div>
    );
  }

  lockChangeAlert = () => {
    if (
      // if pointer lock is disabled (null) then lock the screen
      document.pointerLockElement === null ||
      document.mozPointerLockElement === null
    ) {
      this.unityContent.send(
        "ScreenLocker",
        "WorldPause"
      )
    } else {
      // DO NUTHIN
    }
  }

  componentDidMount() {
    if ("onpointerlockchange" in document) {
      document.addEventListener("pointerlockchange", this.lockChangeAlert, false);
    } else if ("onmozpointerlockchange" in document) {
      document.addEventListener("mozpointerlockchange", this.lockChangeAlert, false);
    }
  }
}

export default UnityComponent;
