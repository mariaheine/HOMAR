import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import { connect } from "react-redux";
import { Editor, EditorState, convertToRaw, convertFromRaw } from "draft-js";

import "./../../../styles/components/blog/blogPost.css";

import { createPost } from "./../../../reduxStore/actions/postActions";

class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: {
        isEmpty: true,
        editEnabled: true
      },
      editor: {
        title: "",
        summaryEditor: EditorState.createEmpty(),
        contentEditor: EditorState.createEmpty()
      },
      staged: {
        title: "",
        rawSummary: "",
        rawContent: ""
      }
    };
  }

  handleTitleChange = e => {
    e.persist();
    this.setState(prevState => ({
      editor: {
        ...prevState.editor,
        title: e.target.value
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

    let rawContent = convertToRaw(
      this.state.editor.contentEditor.getCurrentContent()
    );
    let rawSummary = convertToRaw(
      this.state.editor.summaryEditor.getCurrentContent()
    );

    this.setState(
      {
        staged: {
          title: this.state.editor.title,
          rawSummary: JSON.stringify(rawSummary),
          rawContent: JSON.stringify(rawContent)
        }
      },
      () => {
        // console.log(this.state.staged);
        // this.props.createPost(this.state);
        this.props.handleSubmit(this.state.staged);
      }
    );
  };

  render() {
    return (
      <div className="blogItem">
        <form onSubmit={this.handleSubmit}>
          <h5>NEW POST</h5>
          <div>
            <h5>Title:</h5>
            <input type="text" value={this.state.editor.title} onChange={this.handleTitleChange} />
          </div>
          <div>
            <h5>POST SUMMARY</h5>
            <Editor
              id="editor"
              onChange={e => {
                this.handleSummaryChange(e);
              }}
              editorState={this.state.editor.summaryEditor}
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
              editorState={this.state.editor.contentEditor}
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

  componentDidMount() {
    
    /* 
    
     IMPORTANT!

     IMPLEMENT REDIRECT LATER IF REFRESHED THAT PAGE,
     FORCE FALLBACK TO THE DASHBOARD
    
    */

    if (this.props.data) {
        
      const data = this.props.data;
      
      this.setState(prevState => ({
        editor: {
          ...prevState.editor,
          title: data.title
        }
      }));
      
      let summaryData = data.summary;
      if (summaryData) {
        // console.log(summaryData);
        let DataFromRaw = convertFromRaw(JSON.parse(summaryData));
        let EditorData = EditorState.createWithContent(DataFromRaw);
        this.setState(prevState => ({
          editor: {
            ...prevState.editor,
            summaryEditor: EditorData
          }
        }));
      } else {
        this.setState(prevState => ({
          editor: {
            ...prevState.editor,
            summaryEditor: EditorState.createEmpty()
          }
        }));
      }

      let contentData = data.content;
      if (contentData) {
        // console.log(contentData);
        let DataFromRaw = convertFromRaw(JSON.parse(contentData));
        let EditorData = EditorState.createWithContent(DataFromRaw);
        this.setState(prevState => ({
          editor: {
            ...prevState.editor,
            contentEditor: EditorData
          }
        }));
      } else {
        this.setState(prevState => ({
          editor: {
            ...prevState.editor,
            contentEditor: EditorState.createEmpty()
          }
        }));
      }
    }
  }
}

export default PostForm;
