import React, { Component } from "react";
// import { Editor, EditorState, convertToRaw } from "draft-js";
import Editor, { createEditorStateWithText } from "draft-js-plugins-editor";
import createToolbarPlugin from "draft-js-static-toolbar-plugin";
import createVideoPlugin from "draft-js-video-plugin";
import createEmojiPlugin from "draft-js-emoji-plugin";
import "draft-js-emoji-plugin/lib/plugin.css";
import VideoAdd from "./VideoAdd";

const staticToolbarPlugin = createToolbarPlugin();
const videoPlugin = createVideoPlugin();
const emojiPlugin = createEmojiPlugin();
const { EmojiSelect, EmojiSuggestions } = emojiPlugin;
const { Toolbar } = staticToolbarPlugin;
const plugins = [staticToolbarPlugin, videoPlugin, emojiPlugin];
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
    // console.log(this.props);

    return (
      <div>
        <div className="editor" onClick={this.focus}>
          <Editor
            editorState={this.props.editorState}
            onChange={this.props.onChange}
            plugins={plugins}
            ref={element => {
              this.editor = element;
            }}
          />
          {/* <EmojiSuggestions /> */}
          {/* <Toolbar className="asd" /> */}
        </div>
        <div>
          <EmojiSelect />
          <VideoAdd
            editorState={this.props.editorState}
            onChange={this.props.onChange}
            modifier={videoPlugin.addVideo}
          />
        </div>
      </div>
    );
  }
}

export default EditableRichText;
