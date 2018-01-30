import React, { Component } from "react";
import UnityComponent from "./components/UnityComponent";
import Menu from "./components/Menu";
import "./../styles/styles.css";

class App extends Component {
  render() {
    return (
      <div className="main-container">
        <Menu />
        <UnityComponent />
      </div>
    );
  }
}

export default App;
