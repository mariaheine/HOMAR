import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { createPost } from "./../../../../reduxStore/actions/postActions";

import PostForm from "./PostForm";

class CreatePost extends Component {
  state = {
    hasUnsavedChanges: false
  };

  handleSubmit = stagedPost => {
    this.props.createPost(stagedPost);
    this.props.history.push("/homaremenon");
  };

  handleEdit = () => {
    if (this.state.hasUnsavedChanges === false) {
      this.setState({ hasUnsavedChanges: true });
    }
  };

  render() {
    const { auth, post } = this.props;
    if (!auth.uid) return <Redirect to="/" />;

    return (
      <PostForm
        handleEdit={this.handleEdit}
        handleSubmit={this.handleSubmit}
        data={{ post }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    post: "asd",
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
