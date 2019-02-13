import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Homaremenon from "./user/Homaremenon";
import UserPanel from "./user/UserPanel";
import { checkUserClaims } from "../../../reduxStore/actions/authActions";

import "./../../../styles/components/dashboard.css";

class Dashboard extends Component {
  componentDidMount() {
    const { auth, userState } = this.props;
    
    // console.log(userState);

    if (auth.uid && !userState.claims) {
      // console.log("gothere");

      this.props.checkUserClaims();
    }
  }

  render() {
    const { auth, userState } = this.props;

    // console.log(auth, userState);

    if (!auth.uid) {
      return <Redirect to="/signin" />
    }

    if (!userState.claims) {
      return <p>Loading...</p>;
    } else {
      if (userState.claims.isMod) {
        return <Homaremenon />;
      } else {
        return <UserPanel />;
      }
    }
  }
}

const mapStateToProps = state => {

  return {
    auth: state.firebase.auth,
    userState: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkUserClaims: () => dispatch(checkUserClaims())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
