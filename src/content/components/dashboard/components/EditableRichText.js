import React, { Component } from "react";
import Editor, {
  createEditorStateWithText,
  composeDecorators
} from "draft-js-plugins-editor";
import createToolbarPlugin, { Separator } from "draft-js-static-toolbar-plugin";
import createVideoPlugin from "draft-js-video-plugin";
import createEmojiPlugin from "draft-js-emoji-plugin";
import createLinkPlugin from "draft-js-anchor-plugin";
import createAlignmentPlugin from "draft-js-alignment-plugin";

import createFocusPlugin from "draft-js-focus-plugin";
import "draft-js-static-toolbar-plugin/lib/plugin.css";
import "draft-js-emoji-plugin/lib/plugin.css";
import "draft-js/dist/Draft.css";
// import 'draft-js-focus-plugin/lib/plugin.css';
import focusedSyles from './styles/focusedStyles.css'
import toolbarStyles from "./styles/toolbarStyles.css";
import buttonStyles from "./styles/buttonStyles.css";
import linkStyles from "./styles/buttonStyles.css";
import "draft-js-alignment-plugin/lib/plugin.css";

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
const emojiPlugin = createEmojiPlugin();
const linkPlugin = createLinkPlugin({
  theme: linkStyles
});
const focusPlugin = createFocusPlugin();
const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;
const decorator = composeDecorators(
  alignmentPlugin.decorator,
  focusPlugin.decorator
);
const videoPlugin = createVideoPlugin({ decorator });
const { EmojiSelect, EmojiSuggestions } = emojiPlugin;
const { Toolbar } = staticToolbarPlugin;
const plugins = [
  staticToolbarPlugin,
  videoPlugin,
  emojiPlugin,
  linkPlugin,
  focusPlugin,
  alignmentPlugin
];
// const text =
//   "The toolbar above the editor can be used for formatting text, as in conventional static editors  …";

class EditableRichText extends Component {
  // state = {
  //   editorState: createEditorStateWithText(text)
  // };

  // onChange = editorState => {
  //   this.setState({
  //     editorState
  //   });
  // };

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
          <AlignmentTool />
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
