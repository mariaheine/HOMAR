import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { editUser } from "../../../../reduxStore/actions/authActions";
import "./../../../../styles/components/dashboard.css";

import AddAdmin from './components/AddAdmin'

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

  handleSubmit = e => {
    e.preventDefault();
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
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/" />;

    return (
      <div className="container">
        <div className="rowContainer">
          <div className="userAuth">
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="nickInput">new display Nick 🌄</Label>
                <Input
                  type="text"
                  name="nick"
                  placeholder="nick"
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="urlInput">new avatar URL 👽</Label>
                <Input
                  type="url"
                  name="url"
                  id="urlInput"
                  placeholder="url"
                  onChange={this.onChange}
                />
              </FormGroup>
              <Button id="submit1" color="primary">Update profile!</Button>
            </Form>
          </div>
          <AddAdmin />
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
    editUser: userData => dispatch(editUser(userData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUser);
