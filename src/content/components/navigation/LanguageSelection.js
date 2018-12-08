import React, { Component } from "react";
import { Button } from "reactstrap";

export default class LanguageSelection extends Component {
  render() {
    var littleInline = {
      margin: "1.2rem",
      marginRight: "0.2rem",
      boxShadow: "0vw 1vh 5px black",
      height: '38px'
    };

    var littleOverride = {
      paddingLeft: "2vw",
      paddingRight: "2vw", 
    //   height: "4vh"
    };

    var buttonHeight = {        
    //   height: "4vh"
    }

    return (
      <div style={littleInline}>
        <Button outline color="secondary" style={littleOverride}>
          HOMAR
        </Button>
        <Button color="warning" style={buttonHeight}>pl</Button>
        <Button outline color="danger" style={buttonHeight}>
          en
        </Button>
      </div>
    );
  }
}
