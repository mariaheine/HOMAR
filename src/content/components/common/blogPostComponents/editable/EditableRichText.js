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

var staticToolbarPlugin = createToolbarPlugin();
var emojiPlugin = createEmojiPlugin();

/* FIX? */
/* I have no idea why the linkPlugin doesnt create <a> tag in the editor */
var linkPlugin = createLinkPlugin({
  theme: linkStyles,
  placeholder: "https://..."
});
var focusPlugin = createFocusPlugin();
var alignmentPlugin = createAlignmentPlugin();
var { AlignmentTool } = alignmentPlugin;
var decorator = composeDecorators(
  alignmentPlugin.decorator,
  focusPlugin.decorator
);
var videoPlugin = createVideoPlugin({ decorator });
var { EmojiSelect, EmojiSuggestions } = emojiPlugin;
var { Toolbar } = staticToolbarPlugin;
var plugins = [
  linkPlugin,
  staticToolbarPlugin,
  videoPlugin,
  emojiPlugin,
  focusPlugin,
  alignmentPlugin
];

var placeholderText = "Hello";

class EditableRichText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: createEditorStateWithText(placeholderText)
    };
  }

  onChange = editorState => {
    /* REFACTOR THIS */
    // Possibly using Redux
    // Oddly Draft.js requires the editorState in the state
    // of the same component, when the editorState is being
    // passed through the props (directly using below
    // this.props.onChange() in Editor causes draft-anchor
    // decorators to be lost!!).

    // cant be like that, updating that state updates everything below
    // this.props.onChange(editorState);

    this.setState({
      editorState
    });
  };

  focus = () => {
    this.editor.focus();
  };

  componentDidUpdate(prevProps) {
    const { editorState } = this.props;

    // console.log(editorState);

    // WROMG
    // if (editorState && editorState !== this.state.editorState) {
    //   this.setState({
    //     editorState
    //   });
    // }
  }

  componentDidMount() {
    const { initState, name, isEditable } = this.props;

    var data = requestPostDataByLanguage(initState, "pl");

    var editablePost = requestEditablePostContents(data);

    this.setState({
      editorState: editablePost[name]
    });
  }

  render() {
    console.log(this.props);

    var Toolbrr = this.props.isEditable ? (
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
    ) : null;

    return (
      <div>
        <div className="editor" onClick={this.focus}>
          <Editor
            onChange={this.onChange}
            editorState={this.state.editorState}
            plugins={plugins}
            // Ummm, what is that for?
            ref={element => {
              this.editor = element;
            }}
          />
          {/* FIX?  */}
          {/* Can't get emoji suggestions to work :( */}
          {/* <EmojiSuggestions /> */}
          <AlignmentTool />
        </div>
        <div>{Toolbrr}</div>
      </div>
    );
  }
}

export default EditableRichText;
