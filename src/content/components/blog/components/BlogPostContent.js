import React, { Component } from "react";
import EditableRichText from "../editable/EditableRichText";
import DisplayableRichText from "../displayable/DisplayableRichText";

class BlogPostContent extends Component {
  render() {
    const { isEditable } = this.props;

    var Editor;
    if (isEditable) {
      Editor = (
        <EditableRichText
          name="content"
          onUpdate={editorState => {
            this.props.onUpdate(editorState, "content");
          }}
          initState={this.props.post}
        />
      );
    } else {
      Editor = (
        <DisplayableRichText name="content" initState={this.props.post} />
      );
    }

    return <div className="abstractContent">{Editor}</div>;
  }
}

export default BlogPostContent;
