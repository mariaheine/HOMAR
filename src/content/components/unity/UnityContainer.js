import React, { Component } from "react";

import UnityComponent from "./UnityComponent";
import UnityGallery from "./UnityGallery";
// import "./../../../styles/styles.css";

class UnityContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // I many need a stateful component here later
    };
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
        <div className="container">
          {content}
          <div className="header">
            {/* <h1>HOMAR Research Unit</h1> */}
          </div>
        </div>
      </div>
    );
  }
}

export default UnityContainer;
