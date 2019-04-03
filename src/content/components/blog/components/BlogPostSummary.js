import React, { Component } from "react";
import EditableRichText from "../editable/EditableRichText";
import DisplayableRichText from "../displayable/DisplayableRichText";

class BlogPostSummary extends Component {
  render() {
    const { isEditable } = this.props;

    var Editor;
    if (isEditable) {
      Editor = (
        <EditableRichText
          name="summary"
          onUpdate={editorState => {
            this.props.onUpdate(editorState, "summary");
          }}
          initState={this.props.post}
        />
      );
    } else {
      Editor = (
        <DisplayableRichText name="summary" initState={this.props.post} />
      );
    }

    return <div className="abstractContent">{Editor}</div>;
  }
}

export default BlogPostSummary;
