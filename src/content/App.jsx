import React, { Component } from "react";

import Unity, { RegisterExternalListener, UnityEvent } from "react-unity-webgl";

import UnityComponent from "./components/unity/UnityComponent";
import Menu from "./components/Menu";

import AppDesktop from "./AppDesktop";
import AppMobile from "./AppMobile";

class App extends Component {
  constructor(props) {
    super(props);
    RegisterExternalListener("UnityLoaded", this._unityLoaded.bind(this));

    this.state = {
      loadStatus: false
    };
  }

  _unityLoaded() {
    this.setState({ loadStatus: true });
    console.log("yay");
  }

  render() {
    // var isMobile = window.navigator.userAgent.toLowerCase().includes("mobi");
    var isMobile = true;

    console.log(isMobile);

    if(isMobile) return <AppMobile/>
      else return <AppDesktop/>
  }
}

export default App;
