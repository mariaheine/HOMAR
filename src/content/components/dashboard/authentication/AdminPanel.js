import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { grantSUDO } from "../../../../reduxStore/actions/authActions";
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
    this.props.grantSUDO(this.state.email);
  };

  onChange = e => {
    e.persist();
    this.setState({ email: e.target.value });
  };

  render() {
    return (
      <div className="container">
        <div className="rowContainer" />
        <div className="userAuth">
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="emailInput">Add new sudouser</Label>
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
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    grantSUDO: email => dispatch(grantSUDO(email))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AdminPanel);
