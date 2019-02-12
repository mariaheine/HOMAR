import React, { Component } from "react";

import UnityComponent from "./UnityComponent";
import UnityGallery from "./UnityGallery";
import "./../../../styles/styles.css";

class UnityContainer extends Component {
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
    var isMobile = window.navigator.userAgent.toLowerCase().includes("mobi");

    var content = isMobile ? (
      <UnityGallery />
    ) : (
      <UnityComponent
        height="100%"
        width="100%"
        loadStatus={this.state.loadStatus}
      />
    );

    return (
      <div>
        <div className="main-container">
          {content}
          {/* <UnityComponent height="100%" width="100%" loadStatus={this.state.loadStatus} /> */}
          <div className="header">
            <h1>HOMAR Research Unit</h1>
          </div>
          {/* <div className="fullscreen">
            <h1>fullscreen</h1>
          </div> */}
        </div>
      </div>
    );
  }
}

export default UnityContainer;
