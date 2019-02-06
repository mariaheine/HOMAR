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
  CardText
} from "reactstrap";
import {
  editUser,
  checkUserClaims
} from "../../../../reduxStore/actions/authActions";
import "../../../../styles/components/dashboard.css";

var avatarImage = {
  width: "8vw",
  height: "8vh",
  border: "2px solid black",
  borderRadius: "2px",
  margin: "0.5rem 0 0.5rem 0.5rem"
};

var cardText = { padding: "0" };

var userNick = {
  color: "white",
  padding: "0",
  margin: "0"
};

var cardImage = {
  maxWidth: "20rem"
};

var cardBackground = {
  background: "#0c5852"
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

    console.log(this.props);

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
              <CardBody style={cardBackground}>
                <CardText style={cardText}>
                  <h3 style={userNick}>#{profile.nick}</h3>
                </CardText>
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

    // WORKS, BUT HOW TO ENCAPSULATE THAT?
    // REPEATING THIS SOLUTION IN EVERY PROJECT IS CUMBERSOME
    // const firebase = getFirebase();

    // const user = firebase.auth().currentUser;

    // if (user) {
    //   var asd = user.getIdTokenResult().then(result => {
    //     // console.log(result);
    //     this.setState({ claims: { isMod: result.claims.isMod } });
    //     return result.claims.isMod;
    //   });
    // }
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
