import React, { Component } from "react";
import Unity, { RegisterExternalListener, UnityEvent } from "react-unity-webgl";
import "./../../styles/styles.css";

class UnityComponent extends Component {
  constructor(props) {
    super(props);
    RegisterExternalListener("OpenMenu", this._openMenu.bind(this));
    this.onProgress = this.onProgress.bind(this);

    this.state = {
      loadStatus: false,
      loaderText: "0%"
    };
  }

  onProgress(progression) {
    this.setState({ loaderText: `${parseInt(progression * 100)} %` });
    if (progression === 1) {
      this.setState({ loaderText: "Almost there..." });
      setTimeout(() => {
        this.setState({ loadStatus: true });
      }, 5000);
    }
  }

  _openMenu() {
    // There is a serious problem with locking pointer this way, but this
    // method shows how to run javascript mthdods from within unity.
    console.log("JS exec from Unity");

    // console.log("ADS");
    // var unity = document.querySelector("canvas");
    // console.log(unity);
    // unity.requestPointerLock =
    //   unity.requestPointerLock || unity.mozRequestPointerLock;
    // unity.requestPointerLock();
  }

  render() {
    // let styles = {
    //   background: "black"
    // };

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
      </div>
    );
  }

  componentDidMount() {
    let LockTheScreenUnity = new UnityEvent(
      "ScreenLockManager",
      "LockTheScreen"
    );
    let LockTheScreen = function() {
      if (LockTheScreenUnity.canEmit() === true) {
        LockTheScreenUnity.emit();
      }
    };

    let lockChangeAlert = function() {
      if (
        document.pointerLockElement === null ||
        document.mozPointerLockElement === null
      ) {
        // console.log("The pointer lock status is now unlocked");
        // console.log(unity);
        // console.log(document.pointerLockElement);
        LockTheScreen();
      } else {
        // console.log("The pointer lock status is now locked");
        // let canvas = document.getElementById("#cavnas");
        // console.log(document.pointerLockElement);
        // console.log(canvas);
      }
    };

    if ("onpointerlockchange" in document) {
      document.addEventListener("pointerlockchange", lockChangeAlert, false);
    } else if ("onmozpointerlockchange" in document) {
      document.addEventListener("mozpointerlockchange", lockChangeAlert, false);
    }
  }
}

export default UnityComponent;
