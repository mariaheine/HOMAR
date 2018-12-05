import React, { Component } from "react";
import { connect } from "react-redux";
import { Editor, EditorState, convertToRaw } from "draft-js";

import { createPost } from "./../../../reduxStore/actions/postActions";

class PostForm extends Component {
  state = {
    title: "",
    rawContent: "",
    rawSummary: "",
    contentEditor: EditorState.createEmpty(),
    summaryEditor: EditorState.createEmpty(),
    mode: {
      isNewPost: true,
      editEnabled: true
    },
    staged: {
      title: "",
      rawSummary: "",
      rawContent: ""
    }
  };

  handleTitleChange = e => {
    this.setState({
      title: e.target.value
    });
  };  

  handleSummaryChange = e => {
    this.setState({
      summaryEditor: e
    });
  }

  handleContentChange = e => {
    this.setState({
      contentEditor: e
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    //console.log(this.state);
    
    let rawContent = convertToRaw(this.state.contentEditor.getCurrentContent());
    let rawSummary = convertToRaw(this.state.summaryEditor.getCurrentContent());

    this.setState(
      {
        rawContent: JSON.stringify(rawContent),
        rawSummary: JSON.stringify(rawSummary)
      },
      () => {
        console.log(this.state.rawSummary);
        this.props.createPost(this.state);
      }
    );
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h5>NEW POST</h5>
          <div>
            <h5>Title:</h5>
            <input type="text" onChange={this.handleTitleChange} />
          </div>          
          <div>
            <h5>POST SUMMARY</h5>
            <Editor
              id="editor"
              onChange={e => {
                this.handleSummaryChange(e);
              }}
              editorState={this.state.summaryEditor}
              placeholder="SUMMARY HERE"
            />
          </div>
          <div>
            <h5>POST CONTENT</h5>
            <Editor
              id="editor"
              onChange={editorState => {
                this.handleContentChange(editorState);
              }}
              editorState={this.state.contentEditor}
              placeholder="CONTENT HERE"
            />
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createPost: post => dispatch(createPost(post))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(PostForm);
