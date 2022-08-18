import React, { Component } from 'react'
import BlogPostShort from './BlogPostShort'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button } from 'reactstrap'
import {
  nextFive,
  previousFive
} from "./../../../reduxStore/actions/staticDataActions";

class TheBlog extends Component {
  render() {
    const { posts } = this.props

    console.log(posts);

    var listedPosts = posts
      ? posts &&
        posts.map((post) => <BlogPostShort post={post} key={post.id} />)
      : null

    return (
      <div className="container">
        <div className="">{listedPosts}</div>
        <div>
          <Button
            color="danger"
            onClick={this.props.previousFive}
            hidden={this.props.isFirstPage}
          >
            PREVIOUS
          </Button>
          <Button
            color="primary"
            onClick={this.props.nextFive}
            hidden={this.props.isLastPage}
          >
            NEXT
          </Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
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
    isFirstPage: state.staticDataReducer.isFirstPage,
    isLastPage: state.staticDataReducer.isLastPage,
    editedLanguage: state.postEdit.editedLanguage,
    // posts: state.firestore.ordered.blogPosts
  }
};

const mapDispatchToProps = dispatch => {
  return {
    nextFive: () => {
      dispatch(nextFive());
    },
    previousFive: () => dispatch(previousFive()),
  }
};

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  // firestoreConnect([
  //   {
  //     collection: "blogPosts",
  //     where: ["isPublished", "==", true],
  //     orderBy: ["createdAt", "desc"]
  //   }
  // ])
)(TheBlog)
