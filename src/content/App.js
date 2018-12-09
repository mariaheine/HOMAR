import React, { Component } from "react";

import Unity, { RegisterExternalListener, UnityEvent } from "react-unity-webgl";

import UnityComponent from "./components/unity/UnityComponent";

import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "./routes";
import MainLayout from "./containers/MainLayout";


import AppDesktop from "./AppDesktop";
import AppMobile from "./AppMobile";

class App extends Component {

  render() {
    // TODO MOVE THAT TO THE WARP-RELATED COMPONENT
    // NO NEED TO CHANGE ENTIRE APP
    // var isMobile = window.navigator.userAgent.toLowerCase().includes("mobi");
    // var isMobile = true;
    // console.log(isMobile);
    // if(isMobile) return <AppMobile/>
    //   else return <AppDesktop/>
    return (
      <Router>
        <MainLayout>
          <BaseRouter />
        </MainLayout>
      </Router>
    );
  }
}

export default App;
