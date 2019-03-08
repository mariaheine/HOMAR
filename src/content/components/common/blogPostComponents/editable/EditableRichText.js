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
import "../styles/focusedStyles.css";
import "../styles/toolbarStyles.css";
import "../styles/buttonStyles.css";
import "../styles/anchorStyles.css";
import linkStyles from "../styles/buttonStyles.css";
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
import {
  requestPostDataByLanguage,
  requestEditablePostContents
} from "../../../../../reduxStore/actions/helperActions";

var placeholderText = "Hello, you shouldn't really see that text, hmmm";

class EditableRichText extends Component {
  constructor(props) {
    super(props);

    this._staticToolbarPlugin = createToolbarPlugin();
    this._emojiPlugin = createEmojiPlugin();
    this._linkPlugin = createLinkPlugin({
      theme: linkStyles,
      placeholder: "https://..."
    });
    this._focusPlugin = createFocusPlugin();
    this._alignmentPlugin = createAlignmentPlugin();
    const decorator = composeDecorators(
      this._alignmentPlugin.decorator,
      this._focusPlugin.decorator
    );
    this._videoPlugin = createVideoPlugin({ decorator });

    this.plugins = [
      this._linkPlugin,
      this._staticToolbarPlugin,
      this._videoPlugin,
      this._emojiPlugin,
      this._focusPlugin,
      this._alignmentPlugin
    ];

    this.state = {
      loadedData: false,
      editorState: createEditorStateWithText(placeholderText)
    };
  }

  onChange = editorState => {
    this.setState(
      {
        editorState: editorState
      },
      () => {
        this.props.onUpdate(this.state.editorState)
      }
    );
  };

  focus = () => {
    this.editor.focus();
  };

  componentDidUpdate(prevProps) {

    const { initState, name, isEditable } = this.props;

    var data = requestPostDataByLanguage(initState, "pl");

    var editablePost = requestEditablePostContents(data);

    if (initState && !this.state.loadedData)
      this.setState({
        loadedData: true,
        editorState: editablePost[name]
      });
  }

  componentDidMount() {
    
    // Cammot use componentDidMount to set editorState
    // It causes draft to loose decorators

  }

  render() {

    const { AlignmentTool } = this._alignmentPlugin;
    const { EmojiSelect, EmojiSuggestions } = this._emojiPlugin;
    const { Toolbar } = this._staticToolbarPlugin;
    const { LinkButton } = this._linkPlugin;

    const Toolbrr = this.props.isEditable ? (
      <Toolbar>
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
            <LinkButton {...externalProps} />
            <EmojiSelect />
            <VideoAdd
              editorState={this.state.editorState}
              onChange={this.onChange}
              modifier={this._videoPlugin.addVideo}
            />
          </div>
        )}
      </Toolbar>
    ) : null;

    return (
      <div>
        <div className="editor" onClick={this.focus}>
          <Editor
            onChange={this.onChange}
            editorState={this.state.editorState}
            plugins={this.plugins}
            // Ummm, what is that for?
            ref={element => {
              this.editor = element;
            }}
          />
          {/* FIX?  */}
          {/* Can't get emoji suggestions to work :( */}
          <EmojiSuggestions />
          <AlignmentTool />
        </div>
        <div>{Toolbrr}</div>
      </div>
    );
  }
}

export default EditableRichText;