import React, { Component } from "react";
import { Link } from "react-router-dom";

// Temporary draft-js display using readonly Editor
import { Editor, EditorState, convertFromRaw } from "draft-js";

import "./../../../styles/components/blog/blogPost.css";

class BlogPostSummary extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.post)

    const DataToDisplay = this.props.post.summary
      ? this.props.post.summary
      : this.props.post.content;

    const DBEditorState = convertFromRaw(JSON.parse(DataToDisplay));

    this.state = {
      content: EditorState.createWithContent(DBEditorState)
    };
  }

  render() {
    return (
      <div className="blogItem">
        <Link to={`/blog/${this.props.post.id}`}>
          <Editor
            readOnly="true"
            editorState={this.state.content}
            placeholder="EDITOR HERE"
          />
        </Link>
      </div>
    );
  }
}

export default BlogPostSummary;
