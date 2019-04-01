import React, { Component } from "react";
import BlogPostShort from "./BlogPostShort";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class TheBlog extends Component {
  render() {
    const { posts } = this.props;

    var listedPosts = posts
      ? posts && posts.map(post => <BlogPostShort post={post} key={post.id} />)
      : null;
    
    return (
      <div className="container">
        <div className="">{listedPosts}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.firestore.ordered.blogPosts
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "blogPosts",
      where: ["isPublished", "==", true],
      orderBy: ["createdAt", "desc"]
    }
  ])
)(TheBlog);
