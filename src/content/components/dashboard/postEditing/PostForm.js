import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Editor, EditorState, convertToRaw, convertFromRaw } from "draft-js";

import "./../../../../styles/components/blog/blogContainer.css";
import "./../../../../styles/components/blog/blogPost.css";

import { createPost } from "../../../../reduxStore/actions/postActions";

class PostForm extends Component {
  constructor(props) {
    super(props);

    const { data } = this.props;

    // console.log("here");
    let title;
    let summary;
    let content;
    if (data) {
      title = data.title;
      summary = data.summary;
      content = data.content;
    }

    this.state = {
      mode: {
        isEmpty: true,
        editEnabled: true
      },
      editor: {
        titleEditor: title || EditorState.createEmpty(),
        summaryEditor: summary || EditorState.createEmpty(),
        contentEditor: content || EditorState.createEmpty()
      },
      staged: {
        title: "",
        summary: "",
        content: ""
      }
    };
  }

  handleTitleChange = e => {
    this.setState(prevState => ({
      editor: {
        ...prevState.editor,
        titleEditor: e
      }
    }));
  };

  handleSummaryChange = e => {
    this.setState(prevState => ({
      editor: {
        ...prevState.editor,
        summaryEditor: e
      }
    }));
  };

  handleContentChange = e => {
    this.setState(prevState => ({
      editor: {
        ...prevState.editor,
        contentEditor: e
      }
    }));
  };

  handleSubmit = e => {
    e.preventDefault();

    let rawTitle = convertToRaw(
      this.state.editor.titleEditor.getCurrentContent()
    );
    let rawContent = convertToRaw(
      this.state.editor.contentEditor.getCurrentContent()
    );
    let rawSummary = convertToRaw(
      this.state.editor.summaryEditor.getCurrentContent()
    );

    this.setState(
      {
        staged: {
          title: JSON.stringify(rawTitle),
          summary: JSON.stringify(rawSummary),
          content: JSON.stringify(rawContent)
        }
      },
      () => {
        this.props.handleSubmit(this.state.staged);
      }
    );
  };

  render() {
    return (
      <div className="outerContainer columnContainer">
        <div className="post">
          <form onSubmit={this.handleSubmit}>
            <h5>NEW POST</h5>
            <div>
              <h5>Title</h5>
              <div className="editorField title">
                <Editor
                  id="editor"
                  onChange={e => {
                    this.handleTitleChange(e);
                  }}
                  editorState={this.state.editor.titleEditor}
                />
              </div>
            </div>
            <div>
              <h5>Summary</h5>
              <div className="editorField">
                <Editor
                  id="editor"
                  onChange={e => {
                    this.handleSummaryChange(e);
                  }}
                  editorState={this.state.editor.summaryEditor}
                />
              </div>
            </div>
            <div>
              <h5>Content</h5>
              <div className="editorField">
                <Editor
                  id="editor"
                  onChange={editorState => {
                    this.handleContentChange(editorState);
                  }}
                  editorState={this.state.editor.contentEditor}
                />
              </div>
            </div>
            <div>
              <button>Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // WHAT WAS THAT EVEN?

  // componentWillReceiveProps() {
  //   const { data } = this.props;

  //   // console.log(data);

  //   if (data) {
  //     this.setState(prevState => ({
  //       editor: {
  //         ...prevState.editor,
  //         contentEditor: data.content
  //       }
  //     }));
  //     this.setState(prevState => ({
  //       editor: {
  //         ...prevState.editor,
  //         summaryEditor: data.summary
  //       }
  //     }));
  //   }
  // }
}

export default PostForm;
