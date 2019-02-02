import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect, getFirebase  } from "react-redux-firebase";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import {
  editUser,
  grantSUDO
} from "../../../../reduxStore/actions/authActions";
import "./../../../../styles/components/dashboard.css";

var avatarImage = {
  width: "8vw",
  height: "8vh",
  border: "2px solid black",
  borderRadius: "2px",
  margin: "0.5rem 0 0.5rem 0.5rem"
};
class EditUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: {
        nick: "",
        url: ""
      }
    };
  }

  handleUserUpdate = e => {
    e.preventDefault();
    console.log(e);
    this.props.editUser(this.state.userData);
  };

  onChange = e => {
    e.persist();
    this.setState(prevState => ({
      userData: {
        ...prevState.userData,
        [e.target.name]: e.target.value
      }
    }));
  };

  render() {
    const { auth, profile } = this.props;
    if (!auth.uid) return <Redirect to="/" />;

    console.log(auth);

    return (
      <div className="container">
        <div className="rowContainer">
          <div className="flex col">
            <div>
              <p>User nick: {profile.nick}</p>
              <p>Current avatar: </p>
              <img style={avatarImage} src={profile.avatarURL} />
            </div>
            <div>
              <Button href="/adminPanel" id="submit1" color="danger">
                Enter admin panel
              </Button>
            </div>
          </div>
          <div className="userAuth">
            <Form onSubmit={this.handleUserUpdate}>
              <FormGroup>
                <Label for="nickInput">New display Nick 🌄</Label>
                <Input
                  type="text"
                  name="nick"
                  placeholder="nick"
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="urlInput">New avatar URL 👽</Label>
                <Input
                  type="url"
                  name="url"
                  id="urlInput"
                  placeholder="url"
                  onChange={this.onChange}
                />
              </FormGroup>
              <Button id="submit1" color="primary">
                Update profile!
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // var userId = state.firebase.auth.uid;

  // getFirebase();

  // console.log(getFirebase().auth())

  // console.log(state.firebase.profile)

  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editUser: userData => dispatch(editUser(userData))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "users" }])
)(EditUser);
