import React, { Component } from "react";
import EditableRichText from "../editable/EditableRichText";

class BlogPostSummary extends Component {
  render() {
    const { isEditable } = this.props;

    var Editor;
    if (isEditable) {
      Editor = (
        <EditableRichText
          name="summary"
          isEditable={true}
          onUpdate={editorState => {
            this.props.onUpdate(editorState, "summary");
          }}
          initState={this.props.post}
        />
      );
    }

    return <div className="abstractContent">{Editor}</div>;
  }
}

export default BlogPostSummary;
