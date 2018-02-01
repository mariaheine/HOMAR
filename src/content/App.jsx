import React, { Component } from "react";
import UnityComponent from "./components/UnityComponent";
import Menu from "./components/Menu";
import "./../styles/styles.css";

class App extends Component {
  render() {
    let styles = {
      background: "white",
      height: "30px",
      width: "30px"
    };
    return (
      <div>
        <div className="main-container">
          <Menu />
          <UnityComponent />
          <div className="header">
            <h1>HOMAR Research Unit</h1>
          </div>
          <div className="fullscreen">
            <h1>fullscreen</h1>
          </div>
          <div className="header">
            <canvas style={styles} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
