import React, { Component } from "react";
import UnityComponent from "./components/unity/UnityComponent";
import Menu from "./components/Menu";
import "./../styles/styles.css";

class App extends Component {
  render() {
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
        </div>
      </div>
    );
  }
}

export default App;
