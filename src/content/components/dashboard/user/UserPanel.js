import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { connect } from 'react-redux';
import { signOut } from "../../../../reduxStore/actions/authActions";

import "./../../../../styles/components/dashboard.css";

const UserPanel = (props) => {
  return (
    <div className="container">
      <div className="topPanel">
        <Link
          to={{
            pathname: "/editUser"
          }}
        >
          <Button color="warning">(▀̿Ĺ̯▀̿ ̿)</Button>
        </Link>
        <Button onClick={props.signOut} color="danger">
          ┬┴┬┴┤ ͜ʖ ͡°) ├┬┴┬┴
        </Button>
      </div>
      <div>
        <p>Not much is happening here currently, mhm.</p>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(UserPanel);
