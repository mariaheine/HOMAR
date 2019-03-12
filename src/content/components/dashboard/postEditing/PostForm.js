import React, { Component } from "react";
import { Editor, EditorState, convertToRaw } from "draft-js";
import { connect } from "react-redux";
import { compose } from "redux";
import moment from "moment";
import { firestoreConnect, getVal } from "react-redux-firebase";
import {
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody
} from "reactstrap";
import { createEditorStateWithText } from "draft-js-plugins-editor";
import "./../../../../styles/components/blog.css";
import BlogPostTitle from "../../blog/components/BlogPostTitle";
import BlogPostSummary from "../../blog/components/BlogPostSummary";
import BlogPostContent from "../../blog/components/BlogPostContent";

class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editor: {
        title: null,
        summary: null,
        content: null
      },
      // editor: {
      //   titleEditor: EditorState.createEmpty(),
      //   summaryEditor: EditorState.createEmpty(),
      //   contentEditor: createEditorStateWithText("asd"),
      //   title: createEditorStateWithText("asd"),
      //   isPublished: false
      // },
      staged: {
        postContents: {
          title: "",
          summary: "",
          content: ""
        },
        postData: {
          isPublished: false
        }
      }
    };
  }

  onUpdate = (editorState, target) => {
    this.setState(prevState => ({
      editor: {
        ...prevState.editor,
        [target]: editorState
      }
    }));
  };

  handleIsPublishedChange = () => {
    this.setState(prevState => ({
      editor: {
        ...prevState.editor,
        isPublished: !this.state.editor.isPublished
      }
    }));
  };

  handleSubmit = e => {
    e.preventDefault();

    let rawTitle = convertToRaw(this.state.editor.title.getCurrentContent());
    let rawContent = convertToRaw(
      this.state.editor.content.getCurrentContent()
    );
    let rawSummary = convertToRaw(
      this.state.editor.summary.getCurrentContent()
    );

    this.setState(
      {
        staged: {
          postContents: {
            title: JSON.stringify(rawTitle),
            summary: JSON.stringify(rawSummary),
            content: JSON.stringify(rawContent)
          },
          postData: { isPublished: this.state.editor.isPublished }
        }
      },
      () => {
        this.props.handleSubmit(this.state.staged);
      }
    );
  };

  render() {
    const { data } = this.props;

    const formGroupStyle = {};

    const labelStyle = {
      width: "100%",
      backgroundColor: "black",
      fontSize: "2rem",
      padding: "0.5rem"
    };

    return (
      <div className="container">
        <div className="postAbstract">
          <h5>NEW POST</h5>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup style={formGroupStyle}>
              <Label for="titleEditor" style={labelStyle}>
                Title
              </Label>
              <BlogPostTitle
                post={data.post}
                isEditable={true}
                onUpdate={editorState => {
                  this.onUpdate(editorState, "title");
                }}
              />
            </FormGroup>
            <FormGroup style={formGroupStyle}>
              <Label for="summaryEditor" style={labelStyle}>
                Summary
              </Label>
              <BlogPostSummary
                post={data.post}
                isEditable={true}
                onUpdate={editorState => {
                  this.onUpdate(editorState, "summary");
                }}
              />
            </FormGroup>
            <FormGroup style={formGroupStyle}>
              <Label for="contentEditor" style={labelStyle}>
                Content
              </Label>
              <BlogPostContent
                post={data.post}
                isEditable={true}
                onUpdate={editorState => {
                  this.onUpdate(editorState, "content");
                }}
              />
            </FormGroup>
            <FormGroup check>
              <legend>Is published?</legend>
              <Label check>
                <Input
                  type="checkbox"
                  checked={this.state.editor.isPublished}
                  onChange={this.handleIsPublishedChange}
                />{" "}
                Check me out
              </Label>
            </FormGroup>
            <div>
              <button>Submit</button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default PostForm;
