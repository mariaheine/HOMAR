import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "reactstrap";

import EditablePostList from "../postEditing/EditablePostList";
import Notifications from "../components/Notifications";
import { signOut } from "../../../../reduxStore/actions/authActions";

import "./../../../../styles/components/dashboard.css";

class Homaremenon extends Component {
  render() {
    return (
      <div className="container">
        <div className="topPanel">
          <Link
            to={{
              pathname: "/create",
              state: { hello: true }
            }}
          >
            <Button color="primary"> ̿̿ ̿̿ ̿'̿'\̵͇̿̿\з= ( ▀ ͜͞ʖ▀) =ε/̵͇̿̿/’̿’̿ ̿ ̿̿ ̿̿ ̿̿</Button>
          </Link>
          <Link
            to={{
              pathname: "/editUser"
            }}
          >
            <Button color="warning">(▀̿Ĺ̯▀̿ ̿)</Button>
          </Link>
          <Button onClick={this.props.signOut} color="danger">
            ┬┴┬┴┤ ͜ʖ ͡°) ├┬┴┬┴
          </Button>
        </div>
        <div className="rowContainer">
          <div className="leftPanel">
            <Notifications />
          </div>
          <div className="rightPanel">
            <EditablePostList />
          </div>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   // console.log(state);
// };

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Homaremenon);
