import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { editUser } from "../../../../../reduxStore/actions/authActions";
import "./../../../../../styles/components/dashboard.css";

export default class AddAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.editUser(this.state.userData);
  };

  onChange = e => {
    e.persist();
    this.setState({ email: e.target.value });
  };

  render() {
    return (
      <div className="userAuth">
        <Form onSubmit={this.handleAdminSubmit}>
          <FormGroup>
            <Label for="emailInput">Add new sudouser</Label>
            <Input
              type="email"
              name="email"
              placeholder="email"
              onChange={this.onChange}
            />
          </FormGroup>
          <Button id="submit1" color="danger">ADD 📕</Button>
        </Form>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     auth: state.firebase.auth
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     editUser: userData => dispatch(editUser(userData))
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(EditUser);
