import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect, getVal } from "react-redux-firebase";
import { compose } from "redux";
import { Editor } from "draft-js";

import { requestDisplayablePostByLanguage } from "./../../../reduxStore/actions/helperActions";

import "./../../../styles/components/blog.css";

const BlogPost = props => {
  const { displayPost } = props;

  return (
    <div className="blogItem">
      <Editor
        readOnly="true"
        editorState={displayPost.title}
        placeholder="Whoops, a post should like totally display here 💔👽💦"
      />
      <Editor
        readOnly="true"
        editorState={displayPost.content}
        placeholder="Whoops, a post should like totally display here 💔👽💦"
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  // console.log(state)

  const postId = ownProps.match.params.postId;

  var post = getVal(state.firestore.data, `blogPosts/${postId}`);

  var displayPost = requestDisplayablePostByLanguage(
    post,
    state.language.selectedLanguage
  );

  return {
    displayPost: {
      title: displayPost.title,
      content: displayPost.content
    }
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    // console.log(props)

    var postId = props.match.params.postId;

    return [{ collection: "blogPosts", doc: `${postId}` }];
  })
)(BlogPost);
