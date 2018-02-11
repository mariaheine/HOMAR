import React, { Component } from "react";
import Unity, { RegisterExternalListener, UnityEvent } from "react-unity-webgl";
import "./../../../styles/styles.css";

class UnityLocker extends Component {
  constructor(props) {
    super(props);
    RegisterExternalListener("UnityLoaded", this._unityLoaded.bind(this));
    this.state = {
      lockStatus: false
    };
  }

  _unityLoaded() {
    this.setState({ lockStatus: true });
  }

  render() {
    let locker;
    if (this.state.lockStatus === true) {
      locker = "active";
    } else locker = "inactive";

    return (
      <div className={"webgl-locker " + locker}>
        <canvas id="cnvs" />
      </div>
    );
  }

  componentDidMount() {
    // Screen unlocking && pointer locking

    var canvas = document.querySelector("canvas");

    canvas.requestPointerLock =
      canvas.requestPointerLock || canvas.mozRequestPointerLock;

    let UnlockTheScreenUnity = new UnityEvent(
      "BrowserCommunication",
      "UnlockTheScreen"
    );

    canvas.onclick = () => {
      canvas.requestPointerLock(); // request the lock
      this.setState({ lockStatus: false }, () => {
        if (UnlockTheScreenUnity.canEmit() === true) {
          UnlockTheScreenUnity.emit(); // unlock unity physics
        }
      }); // turn off the lock screen
    };

    // Screen locking stuff?

    let LockTheScreenUnity = new UnityEvent(
      "BrowserCommunication",
      "LockTheScreen"
    );
    // let LockTheScreen = () => {
    //   this.setState({ lockStatus: true });
    //   if (LockTheScreenUnity.canEmit() === true) {
    //     LockTheScreenUnity.emit();
    //   }
    // };
    let LockTheScreen = () => {
      this.setState({ lockStatus: true }, () => {
        if (LockTheScreenUnity.canEmit() === true) {
          LockTheScreenUnity.emit();
        }
      });
    };

    let lockChangeAlert = function() {
      if (
        // if pointer lock is disabled (null) then lock the screen
        document.pointerLockElement === null ||
        document.mozPointerLockElement === null
      ) {
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

export default UnityLocker;
