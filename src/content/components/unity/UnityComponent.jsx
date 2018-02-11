import React, { Component } from "react";
import Unity, { RegisterExternalListener, UnityEvent } from "react-unity-webgl";
import "./../../../styles/styles.css";

import UnityLocker from "./UnityLocker";

class UnityComponent extends Component {
  constructor(props) {
    super(props);
    RegisterExternalListener("OpenMenu", this._openMenu.bind(this));
    this.onProgress = this.onProgress.bind(this);

    this.state = {
      loadStatus: false,
      loaderText: "0%",
      lockStatus: true
    };
  }

  onProgress(progression) {
    this.setState({ loaderText: `${parseInt(progression * 100)}%` });
    // if (progression === 1) {
    //   this.setState({ loaderText: "Almost there..." });
    //   setTimeout(() => {
    //     this.setState({ loadStatus: true });
    //   }, 5000);
    // }
    if (progression === 1) {
      this.setState({ loadStatus: true });
    }
  }

  _openMenu() {
    console.log("[test] JS exec from Unity");
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

    // return (
    //   <div>
    //     <div className="webgl-content">
    //       <div className="webgl-content">
    //         <p>webgl</p>
    //       </div>
    //     </div>
    //     <div className="webgl-loader">
    //       <h1 id="loader">asd as</h1>
    //     </div>
    //   </div>
    // );
    return (
      <div>
        <div className="webgl-content">
          <Unity
            src="UnityBuild/build.json"
            loader="UnityBuild/UnityLoader.js"
            onProgress={this.onProgress}
          />
        </div>
        <div className="webgl-loader">
          {loader}
        </div>
        <UnityLocker />
      </div>
    );
  }
}

export default UnityComponent;
