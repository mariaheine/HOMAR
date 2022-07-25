import React, { Component } from "react";
import BlogPostShort from "./BlogPostShort";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class TheBlog extends Component {
  render() {
    const { posts } = this.props;

    // console.log(posts);

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

  // let entries = Object.entries(state.staticDataReducer.blogPosts);
  // // console.log(entries);

  // let parsedEntries = entries.map(entry => {
  //   return {
  //     id: entry[0],
  //     ...entry[1],
  //     createdAt:  new Date(entry[1].createdAt._seconds * 1000),
  //   }
  // });

  // console.log(parsedEntries);

  return {
    posts: state.staticDataReducer.posts,
    editedLanguage: state.postEdit.editedLanguage
    // posts: state.firestore.ordered.blogPosts
  };
};

export default compose(
  connect(mapStateToProps)
  // firestoreConnect([
  //   {
  //     collection: "blogPosts",
  //     where: ["isPublished", "==", true],
  //     orderBy: ["createdAt", "desc"]
  //   }
  // ])
)(TheBlog);
