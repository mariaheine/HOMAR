import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";

import { signIn } from "../../../../reduxStore/actions/authActions";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popoverOpen: false,
      credentials: {
        email: "",
        password: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    // console.log(this.state);
    this.props.signIn(this.state.credentials);
  };

  onChange = e => {
    e.persist();
    this.setState(prevState => ({
      credentials: {
        ...prevState.credentials,
        [e.target.name]: e.target.value
      }
    }));
  };

  togglePopover = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  };

  render() {
    
    const { authError } = this.props;

    if (this.props.authError !== null) {
    }

    // console.log(authError);
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="emailInput">Email</Label>
            <Input type="email" name="email" onChange={this.onChange} />
          </FormGroup>
          <FormGroup>
            <Label for="passwordInput">Password</Label>
            <Input
              type="password"
              name="password"
              id="passwordInput"
              placeholder="password placeholder"
              onChange={this.onChange}
            />
          </FormGroup>
          <Button id="submit1">Signin</Button>
          <Popover
            placement="right"
            isOpen={this.state.popoverOpen}
            target="passwordInput"
            toggle={this.togglePopover}
            onClick={this.togglePopover}
          >
            <PopoverHeader>LOGIN FAILED</PopoverHeader>
            <PopoverBody>
              {`${this.props.authError}`}
            </PopoverBody>
          </Popover>
        </Form>
        <div>
          or <Button href="/signup/">Signup</Button> !
        </div>        
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    const { authError } = this.props;
    if (authError && authError !== prevProps.authError) {
      // console.log("error: " + this.props.authError);
      this.setState({
        popoverOpen: true
      });
    }
  }
}

const mapStateToProps = state => {
  // console.log(state);

  return {
    authError: state.auth.authError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
