import React, { Component } from "react";

// Temporary draft-js display using readonly Editor
import { Editor, EditorState, convertFromRaw } from "draft-js";

import "./../../../styles/components/blog/blogPost.css";

class BlogPost extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props)

    const DBEditorState = convertFromRaw(JSON.parse(this.props.post.content));

    this.state = {
      content: EditorState.createWithContent(DBEditorState)
    }
  }

  render() {
    return (
      <div className="blogItem">
        <Editor readOnly="true" editorState={this.state.content} placeholder="EDITOR HERE" />
      </div>
    );
  }
}

export default BlogPost;
