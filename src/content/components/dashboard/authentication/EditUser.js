import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { editUser } from "../../../../reduxStore/actions/authActions";
import "./../../../../styles/components/dashboard.css";

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
    return (
      <div className="container">
        <div className="userAuth">
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="nickInput">display Nick 🌄</Label>
              <Input
                type="text"
                name="nick"
                placeholder="nick"
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="urlInput">avatar URL 👽</Label>
              <Input
                type="url"
                name="url"
                id="urlInput"
                placeholder="url"
                onChange={this.onChange}
              />
            </FormGroup>
            <Button id="submit1">Submit</Button>
          </Form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editUser: userData => dispatch(editUser(userData))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(EditUser);
