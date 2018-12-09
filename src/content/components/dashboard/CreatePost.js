import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { createPost } from "./../../../reduxStore/actions/postActions";

import "./../../../styles/components/blog/blogContainer.css";

import PostForm from "./PostForm";

class CreatePost extends Component {
  _createPost = stagedPost => {
    // console.log(stagedPost);
    this.props.createPost(stagedPost);
  };

  render() {
    const { auth } = this.props;
    if(!auth.uid) return <Redirect to="/" />

    // console.log(this.props.location.state)
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
