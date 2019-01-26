import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

import { setLanguage } from "./../../../reduxStore/actions/langActions";

class LanguageSelection extends Component {

  onClick = e => {
    // console.log(e.target.name);
    e.preventDefault();
    this.props.setLanguage(e.target.name);
  };

  render() {
    var littleInline = {
      // margin: "1.2rem",
      margin: "2%",
      marginRight: "0.2rem",
      boxShadow: "0vw 1vh 5px black",
      height: "38px",
      transform: "scale(1)"
    };

    var littleOverride = {
      // paddingLeft: "2vw",
      // paddingRight: "2vw"
      //   height: "4vh"
    };

    var buttonHeight = {
      // height: "25px",
      // width: "25px"
    };

    // console.log(this.props.language);

    var plOutlined;
    var enOutlined;
    switch (this.props.language) {
      case "pl":
        plOutlined = false;
        enOutlined = true;
        break;
      case "en":
        plOutlined = true;
        enOutlined = false;
    }

    return (
      <div style={littleInline}>
        <Link to="/">
          <Button outline color="secondary" style={littleOverride}>
            HOMAR
          </Button>
        </Link>
        <Button
          outline={plOutlined}
          name="pl"
          onClick={this.onClick}
          color="warning"
          style={buttonHeight}
        >
          pl
        </Button>
        <Button
          outline={enOutlined}
          name="en"
          onClick={this.onClick}
          color="danger"
          style={buttonHeight}
        >
          en
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    language: state.language.selectedLanguage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLanguage: language => dispatch(setLanguage(language))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageSelection);
