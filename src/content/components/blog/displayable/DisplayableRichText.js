import React, { Component } from "react";
import { connect } from "react-redux";
import Editor, {
  createEditorStateWithText,
  composeDecorators
} from "draft-js-plugins-editor";
import createVideoPlugin from "draft-js-video-plugin";
import createLinkPlugin from "draft-js-anchor-plugin";
import createAlignmentPlugin from "draft-js-alignment-plugin";
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
  requestPostDataByLanguage,
  requestEditablePostContents
} from "../../../../reduxStore/actions/helperActions.js";

var placeholderText = "Hello, you shouldn't really see that text, hmmm";

class DisplayableRichText extends Component {
  constructor(props) {
    super(props);

    this._linkPlugin = createLinkPlugin({
      theme: linkStyles,
      placeholder: "https://..."
    });
    this._alignmentPlugin = createAlignmentPlugin();
    const videoDecorator = composeDecorators(this._alignmentPlugin.decorator);
    this._videoPlugin = createVideoPlugin({ videoDecorator });
    this.plugins = [this._linkPlugin, this._videoPlugin, this._alignmentPlugin];

    this.state = {
      loadedData: false,
      editorState: createEditorStateWithText(placeholderText)
    };
  }

  onChange = editorState => {
    this.setState({
      editorState: editorState
    });
  };

  //   focus = () => {
  //     this.editor.focus();
  //   };

  componentDidUpdate(prevProps) {
    const { displayedContent } = this.props;

    if (displayedContent && displayedContent !== prevProps.displayedContent) {
      this.setState({
        editorState: displayedContent
      });
    }
  }

  componentDidMount() {
    // Cammot use componentDidMount to set editorState
    // It causes draft to loose decorators
  }

  render() {
    return (
      <div>
        <div className="editor">
          <Editor
            readonly="true"
            onChange={this.onChange}
            editorState={this.state.editorState}
            plugins={this.plugins}
            // Ummm, what is that for?
            // ref={element => {
            //   this.editor = element;
            // }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { name, initState } = ownProps;

  var data = requestPostDataByLanguage(initState, state.language.selectedLanguage);
  var editablePost = requestEditablePostContents(data);

  return {
    displayedContent: editablePost[name]
  };
};

export default connect(mapStateToProps)(DisplayableRichText);
