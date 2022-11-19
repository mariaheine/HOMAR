import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { Button } from "reactstrap";
import { requestDisplayablePostByLanguage } from "../../../reduxStore/actions/helperActions";
import "./../../../styles/components/blog.css";

import BlogPostTitle from "../blog/components/BlogPostTitle";
import BlogPostSummary from "./components/BlogPostSummary";
import ShareButtons from "./displayable/plugins/ShareButtons";

var rightFooter = {
  marginLeft: "auto"
};

class BlogPostShort extends Component {

  render() {
    const { post, hasContent, selectedLanguage } = this.props;

    var ReadMore;
    if (hasContent) {
      ReadMore = (
        <div>
          <Link to={`/blog/${post.id}`}>
            <Button outline={true} color="warning">Read more</Button>
          </Link>
        </div>
      );
    }

    return (
      <div className="postAbstract">
        <Link to={`/blog/${post.id}`}>
          <BlogPostTitle post={post} isEditable={false} />
        </Link>
          <BlogPostSummary post={post} isEditable={false} />
        <div className="abstractFooter">
          <div>{ReadMore}</div>
          <div style={rightFooter}>
            <ShareButtons
              displayPost={post}
              // language={selectedLanguage}
              postId={post.id}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log(ownProps.post);
  var result = requestDisplayablePostByLanguage(
    ownProps.post,
    state.language.selectedLanguage
  );

  return {
    hasContent: result.hasContent,
    selectedLanguage: state.language.selectedLanguage
  };
};

export default compose(
  connect(mapStateToProps)
)(BlogPostShort);