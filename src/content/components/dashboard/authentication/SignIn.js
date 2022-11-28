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
      isVerified: true,
      errorMessage:
        "Generic error message, well, you shouldn't really see that.",
      credentials: {
        email: "admin",
        password: "admin"
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.isVerified) {
      this.props.signIn(this.state.credentials);
    } else {
      this.setState({
        popoverOpen: true,
        errorMessage: "Please verify that you are not a bot."
      });
    }
  };

  onChange = e => {
    e.persist();
    // this.setState(prevState => ({
    //   credentials: {
    //     ...prevState.credentials,
    //     [e.target.name]: e.target.value
    //   }
    // }));
  };

  togglePopover = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  };

  // verifyCaptcha = res => {
  //   if (res) {
  //     this.setState({
  //       isVerified: true
  //     });
  //   }
  // };

  render() {
    const { auth } = this.props;

    if (auth.uid) {
      return <Redirect to="/homaremenon" />;
    }

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
                  placeholder="password"
                  onChange={this.onChange}
                />
              </FormGroup>
              <br />
              <Button style={wideButton} color="warning" id="loginButton">
                Signin
              </Button>
              <Popover
                placement="right"
                isOpen={this.state.popoverOpen}
                target="loginButton"
                onClick={this.togglePopover}
              >
                <PopoverHeader>LOGIN FAILED</PopoverHeader>
                <PopoverBody>{`${this.state.errorMessage}`}</PopoverBody>
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
      this.setState({
        popoverOpen: true,
        errorMessage: authError
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
