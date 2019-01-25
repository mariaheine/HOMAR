import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Editor } from "draft-js"; // Draft-js displaying using readonly Editor

import { requestDisplayablePostByLanguage } from "./../../../reduxStore/actions/helperActions";
import "./../../../styles/components/blog/blogPost.css";

class BlogPostSummary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // content: EditorState.createWithContent(DBEditorState)
    };
  }

  render() {
    return (
      <div className="postAbstract">
        <Link to={`/blog/${this.props.post.id}`}>
          <h3>{this.props.postTitle}</h3>
          <Editor
            readOnly="true"
            editorState={this.props.postContent}
            placeholder="EDITOR HERE"
          />
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {

  var result = requestDisplayablePostByLanguage(ownProps.post, state.language.selectedLanguage);

  // console.log(result);

  return {
    postContent: result.content,
    postTitle: result.title
  };
};

export default connect(mapStateToProps)(BlogPostSummary);
