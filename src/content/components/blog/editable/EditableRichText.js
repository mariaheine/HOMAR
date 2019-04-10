import React, { Component } from "react";
import { connect } from "react-redux";
import Editor, {
  createEditorStateWithText,
  composeDecorators
} from "draft-js-plugins-editor";
import createToolbarPlugin, { Separator } from "draft-js-static-toolbar-plugin";
import createVideoPlugin from "draft-js-video-plugin";
import createEmojiPlugin from "draft-js-emoji-plugin";
import createAlignmentPlugin from "draft-js-alignment-plugin";
import createFocusPlugin from "draft-js-focus-plugin";
import "../styles/draft-toolbar-plugin.css";
import "../styles/draft-emoji-plugin.css";
import "draft-js/dist/Draft.css";
import "../styles/focusedStyles.css";
import "../styles/toolbarStyles.css";
import "../styles/buttonStyles.css";
import "../styles/anchorStyles.css";
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
import {
  requestPostDataByLanguage,
  requestEditablePostContents
} from "../../../../reduxStore/actions/helperActions.js";
import ColorPicker, { colorStyleMap } from "./plugins/ColorPicker";
import VideoAdd from "./plugins/VideoAdd";
import AddLink, { createLinkPlugin} from "./plugins/AddLink";

const styles = {
  toolbarContainer: {
    padding: "1rem",
    position: "fixed",
    width: "30%",
    top: "0",
    left: "35%",
    zIndex: "15"
  },
  toolbar: {
    padding: "0.2rem",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between"
  },
  emojiContainer: {
    backgroundColor: "black"
  }
};

var placeholderText = "Hello, you shouldn't really see that text, hmmm";

class EditableRichText extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadedData: false,
      isFocused: false,
      focusEntered: false,
      editorState: createEditorStateWithText(placeholderText)
    };

    this._staticToolbarPlugin = createToolbarPlugin();
    this._emojiPlugin = createEmojiPlugin();
    this._focusPlugin = createFocusPlugin();
    this._alignmentPlugin = createAlignmentPlugin();
    const decorator = composeDecorators(
      this._alignmentPlugin.decorator,
      this._focusPlugin.decorator
    );
    this._videoPlugin = createVideoPlugin({ decorator });
      this.linkplug = createLinkPlugin()

    this.plugins = [
      this._staticToolbarPlugin,
      this._videoPlugin,
      this._emojiPlugin,
      this._focusPlugin,
      this._alignmentPlugin,
      this.linkplug
    ];
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

  preventDefault = e => {
    /* Just to avoid view scroll jump on toolbar click */
    e.preventDefault();
  }

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
        // console.log("entered parent");
        this.setState({ focusEntered: true });
      }
    });

    editor.addEventListener("focusout", e => {
      const leavingParent = !editor.contains(e.relatedTarget);

      if (leavingParent) {
        setTimeout(() => {
          if (!this.state.focusEntered) {
            this.disableFocus();
            // console.log("leaved parent");
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
    // const { LinkButton } = this._linkPlugin;

    const Toolbrr = this.state.isFocused ? (
      <Toolbar>
        {externalProps => (
          <div onMouseDown={this.preventDefault} style={styles.toolbar} id="toolbar">
            <BoldButton {...externalProps} />
            <ItalicButton {...externalProps} />
            <UnderlineButton {...externalProps} />
            {/* <CodeButton {...externalProps} /> */}
            <Separator {...externalProps} />
            <HeadlineOneButton {...externalProps} />
            <HeadlineTwoButton {...externalProps} />
            <HeadlineThreeButton {...externalProps} />
            <Separator {...externalProps} />
            <UnorderedListButton {...externalProps} />
            <OrderedListButton {...externalProps} />
            {/* <BlockquoteButton {...externalProps} /> */}
            {/* <CodeBlockButton {...externalProps} /> */}
            {/* <LinkButton {...externalProps} /> */}
            <VideoAdd
              {...externalProps}
              editorState={this.state.editorState}
              onChange={this.onChange}
              modifier={this._videoPlugin.addVideo}
            />
            <AddLink
              editorState={this.state.editorState}
              onChange={this.onChange}
            />
            <ColorPicker
              editorState={this.state.editorState}
              onChange={this.onChange}
            />
            <EmojiSelect style={styles.emojiContainer} />
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
          <div style={styles.toolbarContainer}>{Toolbrr}</div>
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
