import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Manifesto extends Component {
  static propTypes = {
    articleID: PropTypes.string
  };

  render() {
    return (
      <div>
        <p>{articleID}</p>
      </div>
    );
  }
}
