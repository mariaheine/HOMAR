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
      <div className="navbarComponent">
        <Link to="/">
          <Button outline color="secondary">
            HOMAR
          </Button>
        </Link>
        <Button
          outline={plOutlined}
          name="pl"
          onClick={this.onClick}
          color="warning"
        >
          pl
        </Button>
        <Button
          outline={enOutlined}
          name="en"
          onClick={this.onClick}
          color="danger"
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
