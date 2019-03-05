import React, { Component } from "react";
// import { Editor, EditorState, convertToRaw } from "draft-js";
import Editor, { createEditorStateWithText } from "draft-js-plugins-editor";
import createToolbarPlugin from "draft-js-static-toolbar-plugin";
import createVideoPlugin from 'draft-js-video-plugin';

const staticToolbarPlugin = createToolbarPlugin();
const videoPlugin = createVideoPlugin();
const { Toolbar } = staticToolbarPlugin;
const plugins = [staticToolbarPlugin, videoPlugin];
const text =
  "The toolbar above the editor can be used for formatting text, as in conventional static editors  …";

class EditableRichText extends Component {
  state = {
    editorState: createEditorStateWithText(text)
  };

  onChange = editorState => {
    this.setState({
      editorState
    });
  };

  focus = () => {
    this.editor.focus();
  };

  render() {
    console.log(this.props);

    return (
      <div onClick={this.focus}>
        <Editor
          editorState={this.props.editorState}
          onChange={this.props.onChange}
          placeholder="asd"
          plugins={plugins}
          ref={element => {
            this.editor = element;
          }}
        />
        <div>
          <Toolbar className="asd" />
        </div>
      </div>
    );
  }
}

export default EditableRichText;
