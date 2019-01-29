import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { createPost } from "./../../../../reduxStore/actions/postActions";

import "./../../../../styles/components/blog/blogContainer.css";

import PostForm from "./PostForm";

class CreatePost extends Component {
  _createPost = stagedPost => {
    this.props.createPost(stagedPost);
    this.props.history.push('/homaremenon');
  };

  render() {
    const { auth } = this.props;
    if(!auth.uid) return <Redirect to="/" />

    return <PostForm handleSubmit={this._createPost} />;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createPost: post => dispatch(createPost(post))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePost);
