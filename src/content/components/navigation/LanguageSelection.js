import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

export default class LanguageSelection extends Component {
  render() {
    var littleInline = {
      // margin: "1.2rem",
      margin: "3%",
      // width: "55%",
      marginRight: "0.2rem",
      boxShadow: "0vw 1vh 5px black",
      height: "38px"
    };

    var littleOverride = {
      // paddingLeft: "2vw",
      // paddingRight: "2vw"
      //   height: "4vh"
    };

    var buttonHeight = {
      // height: "25px",
      // width: "25px"
    }
      
    var langText = {

    }

    return (
      <div style={littleInline}>
        <Link to="/">
          <Button outline color="secondary" style={littleOverride}>
            HOMAR
          </Button>
        </Link>
        <Button color="warning" style={buttonHeight}>
          pl
        </Button>
        <Button outline color="danger" style={buttonHeight}>
          en
        </Button>
        {/* <p>pl/en</p> */}
      </div>
    );
  }
}
