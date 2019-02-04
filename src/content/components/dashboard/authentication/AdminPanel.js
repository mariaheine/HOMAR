import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { grantMOD } from "../../../../reduxStore/actions/authActions";
import "./../../../../styles/components/dashboard.css";
import { getFirebase } from "react-redux-firebase";

class AdminPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.grantMOD(this.state.email);
  };

  onChange = e => {
    e.persist();
    this.setState({ email: e.target.value });
  };

  render() {
    const { auth, isSudo } = this.props;

    if (!auth.uid || !isSudo) return <Redirect to="/" />;

    return (
      <div className="container">
        <div className="rowContainer" />
        <div className="userAuth">
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="emailInput">Add new moderator</Label>
              <Input
                type="email"
                name="email"
                placeholder="email"
                onChange={this.onChange}
              />
            </FormGroup>
            <Button id="add" color="danger">
              ADD 📕
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const firebase = getFirebase();

  var isSudo = firebase
    .auth()
    .currentUser.getIdTokenResult()
    .then(result => {
      return result.claims.isSudo;
    })
    .catch(err => {
      console.log(err);
    });

  return {
    auth: state.firebase.auth,
    isSudo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    grantMOD: email => dispatch(grantMOD(email))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPanel);
