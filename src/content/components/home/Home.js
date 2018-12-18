import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { Entity, Scene } from "aframe-react";
import "aframe";
import "aframe-mouse-cursor-component"; //rmove!
import "aframe-environment-component";
import "aframe-html-shader";

import "./../../../styles/components/home.css";
import Diagram from "./calosc.png";
import Tekst1 from "./brutaztekst1.jpg";
require("./DejaVu-sdf.fnt");
// import BrutazText1 from ""

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      redirectoToWarp: false
    };
  }

  handleClick = () => {
    // console.log("click!");
    if (this.state.count > 1) {
      this.setState({ redirectoToWarp: true });
    } else {
      this.setState({ count: this.state.count + 1 });
    }
  };

  render() {
    const aframeContainer = {
      // margin: "2vh 4vw 2vh 4vw",
      margin: "2vh 5%",
      width: "90%",
      height: "80vh"
    };

    if (this.state.redirectoToWarp) {
      return <Redirect to="/warp" />;
    }

    console.log();

    return (
      <div style={aframeContainer}>
        {/* <div>
          <div className="htmlElement">
            <h3>octachoron, octahedroid, cubic prism</h3>
            <p>
              Punkt wyjścia znajduje się na afektywnym kontinuum między
              syntetyczną intymnością, zmediatyzowaną bliskością i wyobcowaną
              familiarnością, które tworzy membranę spójności dla sygnałów ze
              wszystkich modułów wdrażanych przez HOMAR w Brutaż: asmr, techno,
              dj set, diagram, zegar, taniec, fikcja teoretyczna
            </p>
          </div>
        </div> */}
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
              position="-4.5 2 -0.8254339320791786"
              geometry={{
                primitive: "plane",
                width: 4.6,
                height: 2
              }}
              material={{
                color: "#282828",
                opacity: 0,
                side: "double",
                shader: "flat"
              }}
              rotation="0 95 0"
            >
              <Entity
                position="0 0 0"
                primitive="a-image"
                src={Tekst1}
                width="3.5"
                height="3.5"
                rotation="0 15 0"
              />
            </Entity>
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
                  "INFO: THIS IS ONLY A MODEL DIAGRAM\n\nPlease, enter the warp (by double-pressing on the diagram) to find it's still functional replica.\n\nWARNING: Your smartphone will NOT handle that tech, use pc instead."
              }}
              rotation="0 -35 0"
            />
            />
            <Entity
              geometry="primitive: plane; height: 4; width: 4;"
              material={{
                src: Diagram,
                shader: "flat",
                transparent: true
              }}
              position="-3.308 2 -4.312"
              rotation="0 35 0"
              events={{ click: this.handleClick }}
            />
          </Entity>
          <Entity camera position="-1.5 2 -2" look-controls>
            <Entity cursor={{ fuse: false, rayOrigin: "mouse" }} />
          </Entity>
        </Scene>
      </div>
    );
  }
}
