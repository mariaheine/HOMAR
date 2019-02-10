import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { Button } from "reactstrap";

import "./../../../../styles/components/blog/blogContainer.css";
import "./../../../../styles/components/dashboard/postEditor.css";

import {
  editPost,
  deletePost
} from "./../../../../reduxStore/actions/postActions";
import { requestDisplayablePostByLanguage } from "./../../../../reduxStore/actions/helperActions";

import PostForm from "./PostForm";

class EditPost extends Component {
  state = {
    editingLanguage: "en",
    translatedData: null,
    hasUnsavedChanges: false
  };

  editPost = stagedPost => {
    const postId = this.props.match.params.postId;
    const language = this.state.editingLanguage;

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
        targetLanguage = "pl";
        break;
      case "btnEN":
        targetLanguage = "en";
        break;
    }
    this.setState({ editingLanguage: targetLanguage });
  };

  handleEdit = () => {
    this.setState({ hasUnsavedChanges: true });
  };

  render() {
    const { postData, postPL, postEN, auth } = this.props;

    console.log(this.state.hasUnsavedChanges)

    if (!auth.uid) return <Redirect to="/" />;

    var FormDisplayer;
    if (postData) {
      switch (this.state.editingLanguage) {
        case "pl":
          console.log("asd");
          FormDisplayer = (
            <PostForm
              handleSubmit={this._editPost}
              handleEdit={this.handleEdit}
              key={`form${postPL.title}`}
              data={postPL}
            />
          );
          break;
        case "en":
          console.log("bleh");
          FormDisplayer = (
            <PostForm
              handleSubmit={this._editPost}
              handleEdit={this.handleEdit}
              key={`form${postEN.title}`}
              data={postEN}
            />
          );
          break;
      }
    }

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
  const id = ownProps.match.params.postId;
  const posts = state.firestore.data.blogPosts;
  const post = posts ? posts[id] : null;
  // console.log(post)

  var displayablePostPL = requestDisplayablePostByLanguage(post, "pl");
  var displayablePostEN = requestDisplayablePostByLanguage(post, "en");

  // console.log(displayablePostPL);
  // console.log(displayablePostEN);

  return {
    postData: post,
    postPL: displayablePostPL,
    postEN: displayablePostEN,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // createPost: post => dispatch(createPost(post))
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
