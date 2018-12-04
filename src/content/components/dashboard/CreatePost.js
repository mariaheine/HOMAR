import React, { Component } from "react";
import { connect } from "react-redux";
import { Editor, EditorState, convertToRaw } from "draft-js";

import { createPost } from "./../../../reduxStore/actions/postActions";

class CreatePost extends Component {
  state = {
    title: "",
    rawContent: "",
    editorState: EditorState.createEmpty()
  };

  handleTitleChange = e => {
    this.setState({
      title: e.target.value
    });
  };

  handleEditorChange = e => {
    this.setState({
      //   rawContent: () => {convertToRaw(e)},
      editorState: e
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    //console.log(this.state);
    let raw = convertToRaw(this.state.editorState.getCurrentContent());

    this.setState(
      {
        rawContent: JSON.stringify(raw)
      },
      () => {
        // console.log(this.state.rawContent);
        this.props.createPost(this.state);
      }
    );
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h5>POST CONTENT</h5>
          <div>
            <label htmlFor="content">Content</label>
            <input type="text" onChange={this.handleTitleChange} />
          </div>
          <div>
            <Editor
              id="editor"
              onChange={editorState => {
                this.handleEditorChange(editorState);
              }}
              editorState={this.state.editorState}
              placeholder="EDITOR HERE"
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
)(CreatePost);
