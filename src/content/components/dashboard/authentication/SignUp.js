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
  CardBody,
  CardHeader,
  CardFooter,
  Badge
} from "reactstrap";
import { connect } from "react-redux";
import { signUp } from "../../../../reduxStore/actions/authActions";

const captchaDiv = {
  marginTop: "1rem"
};

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popoverOpen: false,
      isVerified: true,
      errorMessage:
        "Generic error message, well, you shouldn't really see that.",
      newUser: {
        email: "",
        password: "",
        nick: "",
        avatarURL: "",
        cookie: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.isVerified) {
      this.props.signUp(this.state.newUser);
    } else {
      this.setState(
        {
          popoverOpen: true,
          errorMessage: "Please verify that you are not a bot."
        },
        () => {
          // console.log("asd");
        }
      );
    }
  };

  onChange = e => {
    e.persist();
    this.setState(prevState => ({
      newUser: {
        ...prevState.newUser,
        [e.target.name]: e.target.value
      }
    }));
  };

  togglePopover = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  };

  verifyCaptcha = res => {
    if (res) {
      this.setState({
        isVerified: true
      });
    }
  };

  render() {
    const { auth } = this.props;

    if (auth.uid) return <Redirect to="/homaremenon" />;

    return (
      <div className="container">
        <Card>
          <CardHeader>MEMBER DETAILS</CardHeader>
          <CardBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="emailInput">Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="email"
                  onChange={this.onChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="passwordInput">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  onChange={this.onChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="nickInput">
                  <Badge color="warning">you can change it later</Badge>
                  <span> 🌄 display nick</span>
                </Label>
                <Input
                  type="text"
                  name="nick"
                  placeholder="nick"
                  onChange={this.onChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="urlInput">
                  <Badge color="warning">optional</Badge>
                  <span> 👽 avatar URL</span>
                </Label>
                <Input
                  type="url"
                  name="avatarURL"
                  placeholder="url"
                  onChange={this.onChange}
                />
              </FormGroup>
              <div style={captchaDiv}>
                {/* <Recaptcha
                  sitekey="6LcNBZUUAAAAAMo-x7rjv-s7UqLaFCPbomWIJywY"
                  verifyCallback={this.verifyCaptcha}
                  render="explicit"
                  theme="dark"
                /> */}
              </div>
              <CardFooter>
                <Button id="submitButton" color="warning">
                  Register!
                </Button>
                <Button
                  id="submit1"
                  color="info"
                  onClick={this.props.history.goBack}
                >
                  Go back
                </Button>
                <Popover
                  placement="right"
                  isOpen={this.state.popoverOpen}
                  target="submitButton"
                  onClick={this.togglePopover}
                >
                  <PopoverHeader>SIGNUP FAILED</PopoverHeader>
                  <PopoverBody>{`${this.state.errorMessage}`}</PopoverBody>
                </Popover>
              </CardFooter>
            </Form>
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
    signUp: newUser => dispatch(signUp(newUser))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
