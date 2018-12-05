import React, { Component } from "react";
import { connect } from "react-redux";
import { Editor, EditorState, convertToRaw } from "draft-js";

import { createPost } from "./../../../reduxStore/actions/postActions";

import "./../../../styles/components/blog/blogContainer.css";

import PostForm from './PostForm';

class CreatePost extends Component {

  _createPost = stagedPost => {
    console.log(stagedPost);
    this.props.createPost(stagedPost);
  }
  
  render() {
    console.log(this.props.location.state)
    return (<PostForm handleSubmit={this._createPost} />);
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createPost: post => dispatch(createPost(post))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CreatePost);