import React, { Component } from "react";
import Unity, { RegisterExternalListener, UnityEvent } from "react-unity-webgl";
import "./../../../styles/styles.css";

class UnityLocker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lockStatus: true
    };
  }

  render() {
    // Display lock screen only when both unity is loaded and screen is locked
    let lockerStyle;
    if (this.props.loadStatus === true && this.state.lockStatus === true) {
      lockerStyle = "active";
    } else lockerStyle = "inactive";

    return (
      <div className={"webgl-locker " + lockerStyle}>
        <canvas id="cnvs" />
      </div>
    );
  }

  componentDidMount() {
    // Pointer and Unity locking
    var canvas = document.querySelector("canvas");

    canvas.requestPointerLock =
      canvas.requestPointerLock || canvas.mozRequestPointerLock;

    let UnlockUnity = new UnityEvent("BrowserCommunication", "UnlockTheScreen");

    // On lock screen canvas click: unlock unity, "turn off" the lock screen (that is change its style to nonvisible) and request pointerlock
    canvas.onclick = () => {
      canvas.requestPointerLock(); // request the pointer lock
      this.setState({ lockStatus: false }, () => {
        if (UnlockUnity.canEmit() === true) {
          UnlockUnity.emit(); // unlock unity physics
        }
      });
    };

    let LockUnity = new UnityEvent("BrowserCommunication", "LockTheScreen");

    let LockTheScreen = () => {
      this.setState({ lockStatus: true }, () => {
        if (LockUnity.canEmit() === true) {
          LockUnity.emit();
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
        // DO NUTHIN
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
