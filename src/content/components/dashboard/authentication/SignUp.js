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
import { signUp } from "../../../../reduxStore/actions/authActions";

var formContainer = {
  padding: "1rem"
};

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popoverOpen: false,
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
    this.props.signUp(this.state.newUser);
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

  render() {
    const { auth, authError } = this.props;

    if (auth.uid) return <Redirect to="/homaremenon" />;

    if (this.props.authError !== null) {
    }

    // console.log(authError);
    return (
      <div className="container">
        <Card>
          <CardBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="emailInput">⚠️ Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="email"
                  onChange={this.onChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="passwordInput">⚠️ Password</Label>
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
                <Label for="nickInput">🌄 display nick </Label>
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
                👽 avatar URL
                </Label>
                <Input
                  type="url"
                  name="avatarURL"
                  placeholder="url"
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="urlInput">cookie, mmmm 😋</Label>
                <Input
                  type="password"
                  name="cookie"
                  placeholder="cookie"
                  onChange={this.onChange}
                />
              </FormGroup>
              <Button id="submit1" color="warning">
                Register!
              </Button>
              <Popover
                placement="right"
                isOpen={this.state.popoverOpen}
                target="submit1"
                toggle={this.togglePopover}
                onClick={this.togglePopover}
              >
                <PopoverHeader>SIGNUP FAILED</PopoverHeader>
                <PopoverBody>{`${authError}`}</PopoverBody>
              </Popover>
            </Form>
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
    signUp: newUser => dispatch(signUp(newUser))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
