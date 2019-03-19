import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";import { Button } from "reactstrap";
import { requestDisplayablePostByLanguage } from "../../../reduxStore/actions/helperActions";
import "./../../../styles/components/blog.css";

import BlogPostTitle from "../blog/components/BlogPostTitle";
import BlogPostSummary from "./components/BlogPostSummary";
import ShareButtons from "./displayable/ShareButtons";

var rightFooter = {
  marginLeft: "auto"
};

class BlogPostShort extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // content: EditorState.createWithContent(DBEditorState)
    };
  }

  render() {
    const { displayPost, post } = this.props;

    var ReadMore;
    if (displayPost.hasContent) {
      ReadMore = (
        <div>
          <Link to={`/blog/${post.id}`}>
            <Button color="danger">Read more</Button>
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
              displayPost={displayPost}
              postId={post.id}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  var result = requestDisplayablePostByLanguage(
    ownProps.post,
    state.language.selectedLanguage
  );

  return {
    displayPost: {
      title: result.title,
      displayedContent: result.summary,
      hasContent: result.hasContent
    }
  };
};

export default compose(
  connect(mapStateToProps)
)(BlogPostShort);