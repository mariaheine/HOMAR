import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { Entity, Scene } from "aframe-react";
import "aframe";
import "aframe-mouse-cursor-component"; //rmove!
import "aframe-environment-component";
import "aframe-html-shader";

import "./../../../styles/components/home.css";
import Diagram from "./calosc.png";
require("./DejaVu-sdf.fnt");

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      redirectoToWarp: false
    };
  }

  handleClick = () => {
    if (this.state.count > 1) {
      this.setState({ redirectoToWarp: true });
    } else {
      this.setState({ count: this.state.count + 1 });
    }
  };

  render() {
    const aframeContainer = {
      margin: "auto",
      width: "95%",
      height: "70vh",
      maxWidth: "1062px",
      margin: "1rem"
    };

    // const aframeContainer = {
    //   margin: "auto",
    //   width: "95%",
    //   maxWidth: "1062px",
    //   position: "relative",
    //   paddingBottom: "75%"
    // };

    // const aframeContent = {
    //   position: "absolute",
    //   top: "0",
    //   bottom: "0",
    //   left: "0",
    //   right: "0",
    //   zIndex: "1"
    // };

    if (this.state.redirectoToWarp) {
      return <Redirect to="/entity" />;
    }

    return (
      <div className="container">
        <div style={aframeContainer}>
          {/* <div style={aframeContent}> */}
            <Scene embedded vr-mode-ui="enabled: false">
              <Entity
                environment={{
                  preset: "starry",
                  ground: "hills",
                  groundYScale: "30",
                  dressing: "towers",
                  dressingVariance: "10 50 10"
                }}
              />
              <Entity id="UI" position="0 0 0">
                <Entity
                  position="0.7 2 -4"
                  geometry="primitive: plane; height: 2.5; width: 3.5;"
                  material={{
                    color: "black",
                    opacity: 0.6,
                    side: "double",
                    shader: "flat"
                  }}
                  text={{
                    color: "white",
                    anchor: "center",
                    font: "dejavu",
                    align: "center",
                    width: "3",
                    value:
                      "INFO: THIS IS ONLY A MODEL DIAGRAM\n\nPlease, enter the Entity (by double-pressing on the diagram) to find it's still functional replica.\n\nWARNING: Your smartphone will NOT handle that tech, use pc instead."
                  }}
                  rotation="0 -35 0"
                  scale="0.6 0.6 0.6"
                />
                />
                <Entity
                  geometry="primitive: plane; height: 4; width: 4;"
                  material={{
                    src: Diagram,
                    shader: "flat",
                    side: "double",
                    transparent: true
                  }}
                  position="-3.308 2 -4.312"
                  rotation="0 35 0"
                  events={{ click: this.handleClick }}
                />
              </Entity>
              <Entity camera position="-1.5 2 -2" look-controls wasd-controls>
                <Entity cursor={{ fuse: false, rayOrigin: "mouse" }} />
              </Entity>
            </Scene>
          </div>
        {/* </div> */}
      </div>
    );
  }
}
