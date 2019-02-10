import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardImg,
  CardBody,
  CardTitle
} from "reactstrap";
import {
  editUser,
  checkUserClaims
} from "../../../../reduxStore/actions/authActions";
import "../../../../styles/components/dashboard.css";

var cardImage = {
  maxWidth: "20rem"
};

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

  handleUserUpdate = e => {
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
    const { auth, profile, userState } = this.props;

    if (!auth.uid) return <Redirect to="/" />;

    // console.log(this.props);

    if (userState.claims) {
      var AdminPanelButton = userState.claims.isSudo ? (
        <Button href="/adminPanel" id="submit1" color="danger">
          Enter admin panel
        </Button>
      ) : null;
    }

    return (
      <div className="container">
        <div className="rowContainer">
          <div className="flex flexCol">
            <Card>
              <CardImg style={cardImage} width="30%" src={profile.avatarURL} />
              <CardBody>
                <CardTitle>
                 {`#${profile.nick}`}
                </CardTitle>
                {AdminPanelButton}
                <Button
                  id="submit1"
                  color="info"
                  onClick={this.props.history.goBack}
                >
                  Go back
                </Button>
              </CardBody>
            </Card>
          </div>
          <div className="userAuth">
            <Form onSubmit={this.handleUserUpdate}>
              <FormGroup>
                <Label for="nickInput">New display Nick 🌄</Label>
                <Input
                  type="text"
                  name="nick"
                  placeholder="nick"
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="urlInput">New avatar URL 👽</Label>
                <Input
                  type="url"
                  name="url"
                  id="urlInput"
                  placeholder="url"
                  onChange={this.onChange}
                />
              </FormGroup>
              <Button id="submit1" color="primary">
                Update profile!
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const { userState } = this.props;

    if (!userState.claims) {
      this.props.checkUserClaims();
    }
  }
}

const mapStateToProps = state => {

  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    userState: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editUser: userData => dispatch(editUser(userData)),
    checkUserClaims: () => dispatch(checkUserClaims())
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  // ODDLY THIS WAS KINDOF WORKING, INVESTIGATE

  // firebaseConnect((props, { firebase: { auth } }) => {
  //   const isSudo = auth()
  //     .currentUser.getIdTokenResult()
  //     .then(result => {
  //       console.log(result.claims.isSudo);
  //       return result.claims.isSudo;
  //     });

  //   console.log(isSudo);
  // }),
  firestoreConnect([{ collection: "users" }])
)(EditUser);
