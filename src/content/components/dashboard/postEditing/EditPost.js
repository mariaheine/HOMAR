import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { Button } from "reactstrap";

import {
  editPost,
  deletePost
} from "./../../../../reduxStore/actions/postActions";
import { requestEditablePostByLanguage } from "./../../../../reduxStore/actions/helperActions";
import { setEditedLanguage } from "./../../../../reduxStore/actions/postActions";

import PostForm from "./PostForm";

class EditPost extends Component {
  state = {
    editingLanguage: "pl",
    translatedData: null,
    hasUnsavedChanges: false
  };

  editPost = stagedPost => {
    const postId = this.props.match.params.postId;
    const language = this.state.editingLanguage;

    console.log(stagedPost);

    this.props.editPost(postId, stagedPost, language);
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
      case "btnPL":
        this.props.setEditedLanguage("pl");
        targetLanguage = "pl";
        break;
      case "btnEN":
        this.props.setEditedLanguage("en");
        targetLanguage = "en";
        break;
    }
    this.setState({ editingLanguage: targetLanguage });
  };

  /* USE THIS TO VERIFY PAGE LEAVE WITHOUT SAVING CHANGES */
  onChange = () => {
    console.log("wtf")
    if (this.state.hasUnsavedChanges === false) {
      this.setState({ hasUnsavedChanges: true });
    }
  };

  render() {
    const { post, postPL, postEN, auth } = this.props;
    
    if (!auth.uid) return <Redirect to="/" />;

    var FormDisplayer = post ? (
      <PostForm
        handleSubmit={this.editPost}
        onChange={this.onChange}
        key={`form${post.title}`}
        data={{ language: this.state.editingLanguage, post }}
      />
    ) : null;

    return (
      <div className="container">
        <div className="navbar">
          <h3>POST EDITOR</h3>
          <div className="editorMenu">
            <Button onClick={this.handlePostDelete} color="danger">
              DEL
            </Button>
            <button
              id="btnPL"
              onClick={this.changeEditedLanguage}
              className="editorButton"
            >
              Edit Polish Ver.
            </button>
            <button
              id="btnEN"
              onClick={this.changeEditedLanguage}
              className="editorButton"
            >
              Edit English Ver.
            </button>
            <Button
              id="submit1"
              color="info"
              onClick={this.props.history.goBack}
            >
              Go back
            </Button>
          </div>
        </div>
        {FormDisplayer}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // [!] Refactor: This could be grabbed directly through firestoreConnect
  const id = ownProps.match.params.postId;
  const posts = state.firestore.data.blogPosts;
  const post = posts ? posts[id] : null;

  var displayablePostPL = requestEditablePostByLanguage(post, "pl");
  var displayablePostEN = requestEditablePostByLanguage(post, "en");

  return {
    post,
    postPL: displayablePostPL,
    postEN: displayablePostEN,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setEditedLanguage: language => dispatch(setEditedLanguage(language)),
    editPost: (postId, editedPost, language) =>
      dispatch(editPost(postId, editedPost, language)),
    deletePost: postId => dispatch(deletePost(postId))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "blogPosts" }])
)(EditPost);
