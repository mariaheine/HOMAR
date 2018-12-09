import React, { Component } from "react";

// import Unity, { RegisterExternalListener, UnityEvent } from "react-unity-webgl";

import UnityComponent from "./components/unity/UnityComponent";
import "./../styles/styles.css";

class AppDesktop extends Component {
  constructor(props) {
    super(props);
    // RegisterExternalListener("UnityLoaded", this._unityLoaded.bind(this));

    this.state = {
      loadStatus: false
    };
  }

  _unityLoaded() {
    this.setState({ loadStatus: true });
    // console.log("yay");
  }

  render() {

    return (
      <div>
        <div className="main-container">
          <UnityComponent height="100%" width="100%" loadStatus={this.state.loadStatus} />
          <div className="header">
            <h1>HOMAR Research Unit</h1>
          </div>
          <div className="fullscreen">
            <h1>fullscreen</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default AppDesktop;
