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
  Input,
  Card,
  CardBody
} from "reactstrap";
import { connect } from "react-redux";

import { signIn } from "../../../../reduxStore/actions/authActions";

var wideButton = {
  width: "100%"
};

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
    const { auth, authError } = this.props;

    if (auth.uid) {
      return <Redirect to="/homaremenon" />;
    }

    // console.log(authError);
    return (
      <div className="container">
        <Card>
          <CardBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="emailInput">Email</Label>
                <Input
                  type="email"
                  name="email"
                  onChange={this.onChange}
                  placeholder="email"
                />
              </FormGroup>
              <FormGroup>
                <Label for="passwordInput">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="passwordInput"
                  placeholder="psswrd"
                  onChange={this.onChange}
                />
              </FormGroup>
              <Button style={wideButton} color="warning" id="submit1">
                Signin
              </Button>
              <Popover
                placement="right"
                isOpen={this.state.popoverOpen}
                target="passwordInput"
                toggle={this.togglePopover}
                onClick={this.togglePopover}
              >
                <PopoverHeader>LOGIN FAILED</PopoverHeader>
                <PopoverBody>{`${authError}`}</PopoverBody>
              </Popover>
            </Form>
            <br />
            <Button style={wideButton} href="/signup/" color="danger">
              Signup
            </Button>
          </CardBody>
        </Card>
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
    auth: state.firebase.auth,
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
