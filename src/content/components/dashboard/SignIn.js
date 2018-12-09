import React, { Component } from "react";
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

import { signIn } from "./../../../reduxStore/actions/authActions";

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
          <Button id="submit1">Submit</Button>
          <Popover
            placement="bottom"
            isOpen={this.state.popoverOpen}
            target="submit1"
            toggle={this.togglePopover}
          >
            <PopoverHeader>Popover Title</PopoverHeader>
            <PopoverBody>
              Sed posuere consectetur est at lobortis. Aenean eu leo quam.
              Pellentesque ornare sem lacinia quam venenatis vestibulum.
            </PopoverBody>
          </Popover>
        </Form>
      </div>
    );
  }

  //   compo() {
  //     const { authError } = this.props;

  //     console.log("error: " + authError);

  //     if (authError !== null) {
  //       this.togglePopover();
  //     }
  //   }

  static getDerivedStateFromProps(nextProps, nextState) {
    console.log("nexte: " + nextProps);

    return null;
  }
}

const mapStateToProps = state => {
  console.log(state);
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
