import React, { Component } from "react";
import { connect } from "react-redux";

import Homaremenon from "./Homaremenon";
import SignIn from "./authentication/SignIn";

import "./../../../styles/components/dashboard/homaremenon.css";

class Dashboard extends Component {
  render() {
    const { auth } = this.props;
    console.log(auth);

    const content = auth.uid ? <Homaremenon /> : <SignIn />

    return (
      <div className="container">
        { content }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(Dashboard);
