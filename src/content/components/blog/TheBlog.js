import React, { Component } from 'react'
import BlogPost from "./BlogPost.js"
import { connect } from 'react-redux';

import "./../../../styles/components/blog/blogContainer.css";

class TheBlog extends Component {
  render() {

    // This cool "trick" grabs just the articles off the props 
    const { posts } = this.props;
    console.log(posts);

    var listedArticles = posts && posts.map(post => (
      <BlogPost post={post} key={post.id}/>
    ))

    return (
      <div className="container">
        {listedArticles}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.post.posts
  }
}

export default connect(mapStateToProps)(TheBlog);
