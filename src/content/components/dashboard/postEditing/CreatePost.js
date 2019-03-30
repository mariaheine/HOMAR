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
    // console.log(stagedPost);
    this.props.createPost(stagedPost);
    this.props.history.push("/homaremenon");
  };

  onChange = () => {
    // console.log("wtf");
    if (this.state.hasUnsavedChanges === false) {
      this.setState({ hasUnsavedChanges: true });
    }
  };

  render() {
    const { auth, post } = this.props;
    if (!auth.uid) return <Redirect to="/" />;

    return (
      <div className="container">
        <div className="postAbstract">
          <h3>Nowy post ⭐️😎</h3>
          <PostForm
            onChange={this.onChange}
            handleSubmit={this.handleSubmit}
            data={{ post }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);

  return {
    post: {
      authorId: state.firebase.auth.uid
    },
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
