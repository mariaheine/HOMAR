import React, { Component } from "react";
import { connect } from "react-redux";
import { Prompt } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";

import {
  editPost,
  deletePost
} from "./../../../../reduxStore/actions/postActions";
import { requestEditablePostByLanguage } from "./../../../../reduxStore/actions/helperActions";
import {
  moderatorViewPost
} from "./../../../../reduxStore/actions/postActions";
import {
  setEditedLanguage
} from "./../../../../reduxStore/actions/postEditActions";


import PostForm from "./PostForm";

class EditPost extends Component {
  state = {
    editingLanguage: "pl",
    translatedData: null,
    hasUnsavedChanges: false,
    popoversOpen: {
      delete: false
    }
  };

  editPost = stagedPost => {
    const postId = this.props.match.params.postId;
    const language = this.state.editingLanguage;
    const moderatorId = this.props.auth.uid;

    // console.log(moderatorId);

    this.props.editPost(postId, stagedPost, language, moderatorId);

    // Add a condition to check if save failed
    this.setState({ hasUnsavedChanges: false });
  };

  handlePostDelete = () => {
    this.props.deletePost(this.props.match.params.postId);
  };

  changeEditedLanguage = e => {
    e.persist();

    /* ADD PRE-CHANGE CHECK IF THERE IS UNSAVED DATA */

    /* SAME FOR GO BACK AND DELETE POST BUTTONS */

    /* USE state: hasUnsavedChanges */
    
    let targetLanguage;
    switch (e.target.id) {
      case "button_pl":
        this.props.setEditedLanguage("pl");
        targetLanguage = "pl";
        break;
      case "button_en":
        this.props.setEditedLanguage("en");
        targetLanguage = "en";
        break;
    }
    this.setState({ editingLanguage: targetLanguage });
  };

  /* USE THIS TO VERIFY PAGE LEAVE WITHOUT SAVING CHANGES */
  onChange = () => {
    if (this.state.hasUnsavedChanges === false) {
      this.setState({ hasUnsavedChanges: true });
    }
  };

  togglePopover = target => {
    this.setState({
      popoversOpen: {
        ...this.state.popoversOpen,
        [target]: !this.state.popoversOpen[target]
      }
    });
  };

  componentDidMount() {
    
    if (this.props.auth.uid) {
      const postId = this.props.match.params.postId;
      this.props.moderatorViewPost(postId, this.props.auth.uid);
    }
  }

  render() {
    const editorMenu = {
      marginRight: "2rem"
    };

    const deletePostImg = {
      width: "100%",
      height: "auto"
    };

    const deletePostText = {
      marginTop: "1rem",
      color: "black"
    };

    const deletePostButton = {
      width: "100%"
    };

    const promtMessage = "Zapisaliście zmiany? 🐹";

    const { post, auth } = this.props;

    if (!auth.uid) return <Redirect to="/" />;

    var FormDisplayer = post ? (
      <PostForm
        handleSubmit={this.editPost}
        onChange={this.onChange}
        key={`form${post.title}`}
        data={{ post }}
      />
    ) : null;

    return (
      <div className="container">
        <div className="navbar">
          <h3>POST EDITOR</h3>
          <div style={editorMenu}>
            <Button
              id="button_pl"
              onClick={this.changeEditedLanguage}
              color="warning"
            >
              Edit PL.
            </Button>
            <Button
              id="button_en"
              onClick={this.changeEditedLanguage}
              color="info"
            >
              Edit EN.
            </Button>
          </div>
          <div style={editorMenu}>
            <Button
              color="danger"
              id="delete"
              type="button"
              onClick={() => this.togglePopover("delete")}
            >
              DEL
            </Button>
            <Popover
              placement="left"
              target="delete"
              isOpen={this.state.popoversOpen.delete}
              onClick={() => this.togglePopover("delete")}
            >
              <PopoverHeader>DELETE THIS POST</PopoverHeader>
              <PopoverBody>
                <img
                  src="https://media.giphy.com/media/CpoZsKS27cK40/giphy.gif"
                  style={deletePostImg}
                />
                <p style={deletePostText}>Are you sure?</p>
                <Button
                  onClick={this.handlePostDelete}
                  color="danger"
                  id="delete"
                  style={deletePostButton}
                >
                  <span>yes, delete:(</span>
                </Button>
              </PopoverBody>
            </Popover>
            <Button color="info" onClick={this.props.history.goBack}>
              Go back
            </Button>
          </div>
        </div>
        <div className="container">
          <div className="postAbstract">{FormDisplayer}</div>
        </div>
        <Prompt when={this.state.hasUnsavedChanges} message={promtMessage} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log(state);
  // [!] Refactor: This could be grabbed directly through firestoreConnect
  const id = ownProps.match.params.postId;
  const posts = state.firestore.data.blogPosts;
  const post = posts ? posts[id] : null;

  return {
    post,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setEditedLanguage: language => dispatch(setEditedLanguage(language)),
    editPost: (postId, editedPost, language, moderatorId) =>
      dispatch(editPost(postId, editedPost, language, moderatorId)),
    deletePost: postId => dispatch(deletePost(postId)),
    moderatorViewPost: (postId, moderatorId) =>
      dispatch(moderatorViewPost(postId, moderatorId))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "blogPosts" }])
)(EditPost);
