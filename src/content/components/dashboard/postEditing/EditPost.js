import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

import "./../../../../styles/components/blog/blogContainer.css";
import "./../../../../styles/components/dashboard/postEditor.css";

import { editPost } from "./../../../../reduxStore/actions/postActions";
import { requestDisplayablePostByLanguage } from "./../../../../reduxStore/actions/helperActions";

import PostForm from "./PostForm";

class EditPost extends Component {
  state = {
    editingLanguage: "en",
    translatedData: null
  };

  _editPost = stagedPost => {
    console.log(this.props.postData.id);
    const postId = this.props.match.params.postId;
    const language = this.state.editingLanguage;

    this.props.editPost(postId,stagedPost,language);
  };

  _changeEditedLanguage = e => {
    // console.log(e.target)
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

  render() {
    const { postData, postPL, postEN, auth } = this.props;

    if(!auth.uid) return <Redirect to="/" />

    var FormDisplayer;
    if (postData) {
      switch (this.state.editingLanguage) {
        case "pl":
          FormDisplayer = (
            <PostForm
              handleSubmit={this._editPost}
              key={`form${postPL.title}`}
              data={postPL}
            />
          );
          break;
        case "en":
          FormDisplayer = (
            <PostForm
              handleSubmit={this._editPost}
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
            <button
              id="btnPL"
              onClick={this._changeEditedLanguage}
              className="editorButton"
            >
              Edit Polish Ver.
            </button>
            <button
              id="btnEN"
              onClick={this._changeEditedLanguage}
              className="editorButton"
            >
              Edit English Ver.
            </button>
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
    editPost: (postId, editedPost, language) => dispatch(editPost(postId, editedPost, language))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "blogPosts" }])
)(EditPost);
