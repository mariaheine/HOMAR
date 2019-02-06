import React, { Component } from "react";
import { connect } from "react-redux";
import { getFirebase } from "react-redux-firebase";

import Homaremenon from "./user/Homaremenon";
import UserPanel from "./user/UserPanel";
import SignIn from "./authentication/SignIn";

import "./../../../styles/components/dashboard.css";

class Dashboard extends Component {
  render() {
    const { auth, isMod } = this.props;

    console.log(auth, isMod);

    var content;

    if (auth.uid && isMod) {
      content = <Homaremenon />;
    } else if (auth.uid) {
      content = <UserPanel />;
    } else {
      content = <SignIn />;
    }

    return <div className="container">{content}</div>;
  }
}

const mapStateToProps = state => {
  // console.log(state)

  // INSTEAD OF REPEATING IT, MAKE A REDUX ACTION INSTEAD
  const firebase = getFirebase();
  var user = firebase.auth().currentUser;

  var isMod;

  if (user) {
    user
      .getIdTokenResult()
      .then(result => {
        console.log(result.claims.isMod)

        if (result.claims.isMod == true) {
          isMod = true;
        } else {
          isMod = false;
        }
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    isMod = false;
  }

  return {
    auth: state.firebase.auth,
    isMod
  };
};

export default connect(mapStateToProps)(Dashboard);
