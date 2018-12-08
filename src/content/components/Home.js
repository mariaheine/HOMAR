import React, { Component } from "react";
import "aframe";
import { Entity, Scene } from "aframe-react";
import "aframe-environment-component";

export default class Home extends Component {
  render() {
    const aframeContainer = {
      // margin: "2vh 4vw 2vh 4vw",
      margin: "2vh 5%",
      width: "90%",
      height: "80vh"
    };

    return (
      // <div className="aframeContainer">
      <div style={aframeContainer}>
        <Scene embedded vr-mode-ui="enabled: false">
          <Entity environment={{ preset: "yavapai" }} />
          <Entity
            position="0 2 -5"
            geometry="primitive: plane; height: 2; width: 4;"
            material={{
              color: "white",
              opacity: 0.3,
              side: "double",
              shader: "flat"
            }}
            text={{
              color: "#000",
              anchor: "center",
              width: "3.5",
              value:
                "7awOWSP6szXgHZrOZGaKMPQBJ28wZ9HQgCOKskkqRRm5cV3vbbA+ZK2zJQVZfjDrwZKUs49exVHBMLOsD8bYXEEXFOLGZbjTgUHslI8dedOLseB+DcOb7XNoCXod6+/fCdmFDdd7QEpSDSA9M+MjhGlXIZvUtYDTuNDN4tK/PwD9MTrc8ATzCWMoTLWrQHSphuKuOcr5DEjc5STAaM4PHsL0RK41dOI/khN589Eoa5OMNhDpePl+OGXJJioPpeYrwcezVUDQ0rJi6RACXUAc6Q=="
            }}
          />
          <Entity camera position="0 0.1 0" wasd-controls look-controls />
        </Scene>
      </div>
    );
  }
}
