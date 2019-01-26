import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";

import "./../../../../styles/components/dashboard/editablePostList.css";

class EditablePostList extends Component {
  render() {
    const { posts } = this.props;

    // Move it to a separate component - displaying the list
    // of all articles with ability to edit them
    var listedPosts =
      posts &&
      posts.map(post => (
        <div key={`Div${post.id}`} className="item">
          <Link
            key={`Link${post.id}`}
            to={{
              pathname: `/homaremenon/edit/${post.id}`,
              state: { postId: post.postId }
            }}
          >
            <button className="postTitle" key={post.id}>{post.polish.title}</button>
          </Link>
        </div>
      ));

    return (
      <div className="container">
        <h2> 🍇🍍🍉Lista pooostówww 📝💬 </h2>
        <div className="item">{listedPosts}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return {
    posts: state.firestore.ordered.blogPosts
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "blogPosts" }])
)(EditablePostList);
