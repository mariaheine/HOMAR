import React, { Component } from "react";
import { connect } from "react-redux";

import Homaremenon from "./Homaremenon";
import SignIn from "./SignIn";

import "./../../../styles/components/dashboard/homaremenon.css";

class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <SignIn />
        {/* <Homaremenon/> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
//   console.log(state);
};

export default connect(mapStateToProps)(Dashboard);
