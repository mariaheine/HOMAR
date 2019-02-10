import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import {
  checkUserClaims,
  grantMOD
} from "../../../../reduxStore/actions/authActions";
import "./../../../../styles/components/dashboard.css";

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
    const { auth, userState } = this.props;

    if (!auth.uid) return <Redirect to="/" />;

    if (!userState.claims) {
      return <p>Loading...</p>;
    } else {
      if (!userState.claims.isSudo) {
        return <Redirect to="/signin" />;
      }
    }

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

  componentDidMount() {
    this.props.checkUserClaims();
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
    grantMOD: email => dispatch(grantMOD(email)),
    checkUserClaims: () => dispatch(checkUserClaims())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPanel);
