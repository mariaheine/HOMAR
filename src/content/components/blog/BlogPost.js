import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import moment from "moment";
import { Button } from "reactstrap";

import ShareButtons from "./displayable/plugins/ShareButtons";
import BlogPostTitle from "../blog/components/BlogPostTitle";
import BlogPostContent from "../blog/components/BlogPostContent";

import "./styles/anchorStyles.css";
import "./../../../styles/components/blog.css";

var moveRight = {
  marginLeft: "auto"
};

class BlogPost extends Component {

  render() {
    const { post } = this.props;

    document.body.scrollTop = 0;

    if (!post) {
      return <p>Loading...</p>;
    }

    return (
      <div className="container">
        <div className="postAbstract">
          <BlogPostTitle post={post} isEditable={false} />

          <div className="abstractContent">
            <BlogPostContent post={post} isEditable={false} />
          </div>

          <div className="abstractFooter">
            <Button
              id="submit1"
              color="info"
              onClick={this.props.history.goBack}
            >
              Go back
            </Button>
            <div style={moveRight}>
              <ShareButtons
                displayPost={post}
                postId={this.props.match.params.postId}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {

  const postId = ownProps.match.params.postId;
  const post = state.staticDataReducer.posts.find(post => post.id == postId);

  return {
    post
  };
};

export default compose(
  connect(mapStateToProps),
)(BlogPost);
