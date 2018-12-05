import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import "./../../../styles/components/blog/blogContainer.css";
import "./../../../styles/components/dashboard/postEditor.css";

import { createPost } from "./../../../reduxStore/actions/postActions";

import PostForm from "./PostForm";

class EditPost extends Component {
  state = {
    editingLanguage: "pl",
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
        targetLanguage = "en";
        break;
    }
    this.setState({ editingLanguage: targetLanguage });
  };

  render() {
    const { postData } = this.props;
    // console.log(this.props);
    
    console.log(postData);
    var translatedData;
    if (postData) {
      switch (this.state.editingLanguage) {
        case "pl":
          translatedData = postData.polish;
          break;
        case "en":
          translatedData = postData.english;
          break;
        default:
          translatedData = postData.polish;
          break;
      }
      // console.log(translatedData);
      // this.setState({translatedData: translatedData})
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
        <PostForm data={translatedData} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.postId;
  const posts = state.firestore.data.blogPosts;
  const post = posts ? posts[id] : null;
  // console.log(post)
  return {
    postData: post
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
