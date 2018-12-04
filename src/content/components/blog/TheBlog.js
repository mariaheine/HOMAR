import React, { Component } from 'react'
import BlogPost from "./BlogPost.js"
import { connect } from 'react-redux';

import "./../../../styles/components/blog/blogContainer.css";

class TheBlog extends Component {
  render() {

    // This cool "trick" grabs just the articles off the props 
    const { articles } = this.props;
    console.log(articles);

    var listedArticles = articles && articles.map(article => (
      <BlogPost post={article} key={article.id}/>
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
    articles: state.article.articles
  }
}

export default connect(mapStateToProps)(TheBlog);
