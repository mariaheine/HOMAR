import React, { Component } from 'react'
import BlogPostShort from './BlogPostShort'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Badge } from 'reactstrap'
import {
  nextFive,
  previousFive
} from "./../../../reduxStore/actions/staticDataActions";

class TheBlog extends Component {
  render() {
    const { posts, currentPageIndex, totalPageCount } = this.props

    // console.log(posts);

    var listedPosts = posts
      ? posts &&
        posts.map((post) => <BlogPostShort post={post} key={post.id} />)
      : null

    return (
      <div className="container">
        <div className="">{listedPosts}</div>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Button
            color="danger"
            outline={true}
            onClick={this.props.previousFive}
            hidden={this.props.isFirstPage}
          >
            PREVIOUS
          </Button>
          <Button
            color="primary"
            outline={true}
            onClick={this.props.nextFive}
            hidden={this.props.isLastPage}
          >
            NEXT
          </Button>
          <h5 style={{padding: 0, margin: '0 1rem', fontFamily: 'times'}}>
            📜 {currentPageIndex + 1} of {totalPageCount}
          </h5>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.staticDataReducer.posts,
    currentPageIndex: state.staticDataReducer.currentPage,
    totalPageCount: state.staticDataReducer.totalPageCount,
    isFirstPage: state.staticDataReducer.isFirstPage,
    isLastPage: state.staticDataReducer.isLastPage,
    editedLanguage: state.postEdit.editedLanguage,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    nextFive: () => {
      document.body.scrollTop = 0;
      dispatch(nextFive());
    },
    previousFive: () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      dispatch(previousFive());
    }
  }
};

export default compose(connect(mapStateToProps,mapDispatchToProps))(TheBlog)
