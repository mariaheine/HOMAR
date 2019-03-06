import React, { Component } from "react";
import Editor, { createEditorStateWithText } from "draft-js-plugins-editor";
import createToolbarPlugin, { Separator } from "draft-js-static-toolbar-plugin";
import createVideoPlugin from "draft-js-video-plugin";
import createEmojiPlugin from "draft-js-emoji-plugin";
import createLinkPlugin from "draft-js-anchor-plugin";
import "draft-js-static-toolbar-plugin/lib/plugin.css";
import "draft-js-emoji-plugin/lib/plugin.css";
import "draft-js/dist/Draft.css";
import toolbarStyles from "./styles/toolbarStyles.css";
import buttonStyles from "./styles/buttonStyles.css";
import linkStyles from "./styles/buttonStyles.css";

import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton
} from "draft-js-buttons";
import VideoAdd from "./VideoAdd";

const staticToolbarPlugin = createToolbarPlugin();
// const staticToolbarPlugin = createToolbarPlugin({
//   theme: { buttonStyles, toolbarStyles }
// });
const videoPlugin = createVideoPlugin();
const emojiPlugin = createEmojiPlugin();
const linkPlugin = createLinkPlugin({
  theme: linkStyles
});
const { EmojiSelect, EmojiSuggestions } = emojiPlugin;
const { Toolbar } = staticToolbarPlugin;
const plugins = [staticToolbarPlugin, videoPlugin, emojiPlugin, linkPlugin];
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
          <EmojiSuggestions />
        </div>
        <div>
          <Toolbar className="asd">
            {externalProps => (
              <div>
                <BoldButton {...externalProps} />
                <ItalicButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                <CodeButton {...externalProps} />
                <Separator {...externalProps} />
                <UnorderedListButton {...externalProps} />
                <OrderedListButton {...externalProps} />
                <BlockquoteButton {...externalProps} />
                <CodeBlockButton {...externalProps} />
                <linkPlugin.LinkButton {...externalProps} />
                <EmojiSelect />
                <VideoAdd
                  editorState={this.props.editorState}
                  onChange={this.props.onChange}
                  modifier={videoPlugin.addVideo}
                />
              </div>
            )}
          </Toolbar>
        </div>
      </div>
    );
  }
}

export default EditableRichText;
