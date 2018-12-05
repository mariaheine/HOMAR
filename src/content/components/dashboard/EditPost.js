import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import "./../../../styles/components/blog/blogContainer.css";
import "./../../../styles/components/dashboard/postEditor.css";

import { createPost } from "./../../../reduxStore/actions/postActions";
import { requestDisplayablePostByLanguage } from "./../../../reduxStore/actions/helperActions";

import PostForm from "./PostForm";

class EditPost extends Component {
  state = {
    editingLanguage: "en",
    translatedData: null
  };

  _editPost = stagedPost => {
    // this.props.createPost(stagedPost);
  };

  _changeEditedLanguage = e => {
    // console.log(e.target)
    let targetLanguage;
    switch (e.target.id) {
      case "btnPL":
        targetLanguage = "pl";
        break;
      case "btnEN":

        /*
          CHECK IF ENGLISH VERSION ISNT NULL
          IF IT IS CREATE NEW EMPTY BECAUSE CURRENTLY WE GET FALLBACK
          TO POLISH VERSION ON ENG BUTTON CLICK
        */


        targetLanguage = "en";
        break;
    }
    this.setState({ editingLanguage: targetLanguage });
  };

  render() {
    const { postData, postPL, postEN } = this.props;

    // console.log(postData);
    var translatedData;

    var translation;
    if (postData) {
      switch (this.state.editingLanguage) {
        case "pl":
          translation = postPL;
          break;
        case "en":
          console.log("fuck")
          translation = postEN;
          break;
      }
    }

    console.log(this.state.editingLanguage)
    console.log(translation);

    var FormDisplayer = <PostForm key={`form${translation}`} data={translation} />;

    // console.log(FormDisplayer);

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
        {/* <PostForm data={translatedData} /> */}
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

  console.log(displayablePostPL);
  console.log(displayablePostEN)

  return {
    postData: post,
    postPL: displayablePostPL,
    postEN: displayablePostEN
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // createPost: post => dispatch(createPost(post))
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "blogPosts" }])
)(EditPost);
