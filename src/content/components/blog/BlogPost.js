import React, { Component } from 'react'
import PropTypes from 'prop-types'

import "./../../../styles/components/blog/blogPost.css";

const BlogPost = ({post}) => {
  
    return (
      <div className="blogItem">
        {post.content}
      </div>
    );
  };

  export default BlogPost;