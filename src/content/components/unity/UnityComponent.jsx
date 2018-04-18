import React, { Component } from "react";
import Unity, { RegisterExternalListener, UnityEvent } from "react-unity-webgl";
import "./../../../styles/styles.css";

import UnityLocker from "./UnityLocker";

class UnityComponent extends Component {
  constructor(props) {
    super(props);
    RegisterExternalListener("OpenMenu", this._openMenu.bind(this));
    RegisterExternalListener("UnityLoaded", this._unityLoaded.bind(this));
    this.onProgress = this.onProgress.bind(this);

    this.state = {
      loadStatus: false,
      loaderText: "0%"
    };
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
            src="Build/DefaultWebGL.json"
            loader="Build/UnityLoader.js"
            onProgress={this.onProgress}
          />
        </div>

        <div className="webgl-loader">
          {loader}
        </div>

        <UnityLocker loadStatus={this.state.loadStatus} />
      </div>
    );
  }
}

export default UnityComponent;
