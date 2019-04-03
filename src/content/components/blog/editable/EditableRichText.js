import React, { Component } from "react";
import { connect } from "react-redux";
import Editor, {
  createEditorStateWithText,
  composeDecorators
} from "draft-js-plugins-editor";
import { Modifier, EditorState, RichUtils } from "draft-js";
import createToolbarPlugin, { Separator } from "draft-js-static-toolbar-plugin";
import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
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
import "../styles/draft.css";

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
} from "../../../../reduxStore/actions/helperActions.js";
import ColorPicker, { colorStyleMap } from "./ColorPicker";

const toolbarContainer = {
  padding: "1rem"
};

var placeholderText = "Hello, you shouldn't really see that text, hmmm";

class EditableRichText extends Component {
  constructor(props) {
    super(props);

    this._staticToolbarPlugin = createToolbarPlugin();
    this._inlineToolbarPlugin = createInlineToolbarPlugin();
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
      this._inlineToolbarPlugin,
      this._videoPlugin,
      this._emojiPlugin,
      this._focusPlugin,
      this._alignmentPlugin
    ];

    this.state = {
      loadedData: false,
      isFocused: false,
      focusEntered: false,
      editorState: createEditorStateWithText(placeholderText)
    };
  }

  onChange = editorState => {
    this.setState(
      {
        editorState: editorState
      },
      () => {
        this.props.onUpdate(this.state.editorState);
      }
    );
  };

  enableFocus = () => {
    this.setState({ isFocused: true }, () => {
      this.editor.focus();
    });
  };

  disableFocus = () => {
    this.setState({ isFocused: false });
  };

  componentDidUpdate(prevProps) {
    const { initState, name, language } = this.props;

    if (initState && !this.state.loadedData) {
      var data = requestPostDataByLanguage(initState, language);
      var editablePost = requestEditablePostContents(data);

      this.setState({
        loadedData: true,
        editorState: editablePost[name]
      });
    }

    if (initState && language != prevProps.language) {
      var data = requestPostDataByLanguage(initState, language);
      var editablePost = requestEditablePostContents(data);

      this.setState({
        editorState: editablePost[name]
      });
    }
  }

  componentDidMount() {
    // Cammot use componentDidMount to set editorState
    // It causes draft to loose decorators

    const editor = document.getElementById(`${this.props.name}Editor`);

    editor.addEventListener("focusin", e => {
      const enteringParent = !editor.contains(e.relatedTarget);

      if (enteringParent) {
        console.log("entered parent");
        this.setState({ focusEntered: true });
      }
    });

    editor.addEventListener("focusout", e => {
      const leavingParent = !editor.contains(e.relatedTarget);

      if (leavingParent) {
        setTimeout(() => {
          if (!this.state.focusEntered) {
            this.disableFocus();
            console.log("leaved parent");
          } else {
            
          }
        }, 100);
      }
      this.setState({ focusEntered: false });
    });
  }

  render() {
    const { AlignmentTool } = this._alignmentPlugin;
    const { EmojiSelect, EmojiSuggestions } = this._emojiPlugin;
    const { Toolbar } = this._staticToolbarPlugin;
    const { InlineToolbar } = this._inlineToolbarPlugin;
    const { LinkButton } = this._linkPlugin;

    const Toolbrr = this.state.isFocused ? (
      <Toolbar>
        {externalProps => (
          <div id="toolbar">
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
              {...externalProps}
              editorState={this.state.editorState}
              onChange={this.onChange}
              modifier={this._videoPlugin.addVideo}
            />
            <ColorPicker
              editorState={this.state.editorState}
              onChange={this.onChange}
            />
          </div>
        )}
      </Toolbar>
    ) : null;

    return (
      <div id={`${this.props.name}Editor`} onClick={this.enableFocus}>
        <div className="editor">
          <Editor
            onChange={this.onChange}
            editorState={this.state.editorState}
            plugins={this.plugins}
            customStyleMap={colorStyleMap}
            // Ummm, what is that for?
            ref={element => {
              this.editor = element;
            }}
          />
          <EmojiSuggestions />
          <AlignmentTool />
          {/* <InlineToolbar>
            {externalProps => (
              <div>
                <ColorPicker
                  {...externalProps}
                  editorState={this.state.editorState}
                  onChange={this.onChange}
                />
              </div>
            )}
          </InlineToolbar> */}
          <div style={toolbarContainer}>{Toolbrr}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);

  return {
    language: state.post.editedLanguage
  };
};

export default connect(mapStateToProps)(EditableRichText);
