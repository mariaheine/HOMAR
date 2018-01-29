import React, { Component } from "react";
// import Unity from "react-unity-webgl";
import Unity, { RegisterExternalListener, UnityEvent } from "react-unity-webgl";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    RegisterExternalListener("OpenMenu", this._openMenu.bind(this));
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
    let styles = {
      background: "black"
    };

    return (
      <div>
        <Unity src="UnityBuild/build.json" loader="UnityBuild/UnityLoader.js" />
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

export default App;
