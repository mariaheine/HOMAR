import React, { Component } from "react";
import { connect } from "react-redux";
import Editor, {
  createEditorStateWithText,
  composeDecorators
} from "draft-js-plugins-editor";
import { Modifier, EditorState, RichUtils } from "draft-js";
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

const toolbarContainer = {
  padding: "1rem"
};

var placeholderText = "Hello, you shouldn't really see that text, hmmm";

const colorStyleMap = {
  red: {
    color: "rgba(255, 0, 0, 1.0)"
  },
  orange: {
    color: "rgba(255, 127, 0, 1.0)"
  },
  yellow: {
    color: "rgba(180, 180, 0, 1.0)"
  },
  green: {
    color: "rgba(0, 180, 0, 1.0)"
  },
  blue: {
    color: "rgba(0, 0, 255, 1.0)"
  },
  indigo: {
    color: "rgba(75, 0, 130, 1.0)"
  },
  violet: {
    color: "rgba(127, 0, 255, 1.0)"
  }
};

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

    // this.toggleColor = toggledColor => this._toggleColor(toggledColor);

    this.state = {
      loadedData: false,
      editorState: createEditorStateWithText(placeholderText)
    };
  }

  toggleColor = toggledColor => {
    const { editorState } = this.state;
    const selection = editorState.getSelection();

    console.log(Editor);

    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(colorStyleMap).reduce(
      (contentState, color) => {
        return Modifier.removeInlineStyle(contentState, selection, color);
      },
      editorState.getCurrentContent()
    );

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      "change-inline-style"
    );

    const currentStyle = editorState.getCurrentInlineStyle();

    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color);
      }, nextEditorState);
    }

    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledColor
      );
    }

    this.onChange(nextEditorState);
  };

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

  focus = () => {
    this.editor.focus();
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
        <ColorControls
          editorState={this.state.editorState}
          onToggle={this.toggleColor}
        />
        <div className="editor" onClick={this.focus}>
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
        </div>
        <div style={toolbarContainer}>{Toolbrr}</div>
      </div>
    );
  }
}

const styles = {
  root: {
    fontFamily: "'Georgia', serif",
    fontSize: 14,
    padding: 20,
    width: 600
  },
  editor: {
    borderTop: "1px solid #ddd",
    cursor: "text",
    fontSize: 16,
    marginTop: 20,
    minHeight: 400,
    paddingTop: 20
  },
  controls: {
    fontFamily: "'Helvetica', sans-serif",
    fontSize: 14,
    marginBottom: 10,
    userSelect: "none"
  },
  styleButton: {
    color: "#999",
    cursor: "pointer",
    marginRight: 16,
    padding: "2px 0"
  }
};

class StyleButton extends React.Component {
  constructor(props) {
    super(props);
    this.onToggle = e => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let style;
    if (this.props.active) {
      style = { ...styles.styleButton, ...colorStyleMap[this.props.style] };
    } else {
      style = styles.styleButton;
    }

    return (
      <span style={style} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

var COLORS = [
  { label: "Red", style: "red" },
  { label: "Orange", style: "orange" },
  { label: "Yellow", style: "yellow" },
  { label: "Green", style: "green" },
  { label: "Blue", style: "blue" },
  { label: "Indigo", style: "indigo" },
  { label: "Violet", style: "violet" }
];

const ColorControls = props => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  let i = 0;
  return (
    <div style={styles.controls}>
      {COLORS.map(type => {
        i = i + 1;
        return (
          <StyleButton
            key={`${type}_${i}`}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = state => {
  // console.log(state);

  return {
    language: state.post.editedLanguage
  };
};

export default connect(mapStateToProps)(EditableRichText);
