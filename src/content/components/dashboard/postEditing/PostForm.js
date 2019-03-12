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
import {
  requestPostDataByLanguage,
  requestEditablePostContents
} from "./../../../../reduxStore/actions/helperActions";

import { createEditorStateWithText } from "draft-js-plugins-editor";
import EditableRichText from "../../blog//editable/EditableRichText";
import "./../../../../styles/components/blog.css";
import BlogPostTitle from "../../blog/BlogPostTitle";

class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: null,
      content: null,
      editor: {
        titleEditor: EditorState.createEmpty(),
        summaryEditor: EditorState.createEmpty(),
        contentEditor: createEditorStateWithText("asd"),
        title: createEditorStateWithText("asd"),
        isPublished: false
      },
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

  handleTitleChange = e => {
    this.props.handleEdit();

    this.setState(prevState => ({
      editor: {
        ...prevState.editor,
        titleEditor: e
      }
    }));
  };

  handleSummaryChange = e => {
    this.props.handleEdit();

    this.setState(prevState => ({
      editor: {
        ...prevState.editor,
        summaryEditor: e
      }
    }));
  };

  handleContentChange = e => {
    this.props.handleEdit();

    this.setState(prevState => ({
      editor: {
        ...prevState.editor,
        contentEditor: e
      }
    }));
  };

  /* REFACTOR ABOVE AROUND THIS */
  onChange = (editorState, target) => {
    this.setState(prevState => ({
      editor: { ...prevState.editor, [target]: editorState }
    }));
  };

  onUpdate = (editorState, target) => {
    this.setState(prevState => ({
      [target]: editorState
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

  loadPostDataIntoState = () => {
    const { data } = this.props;

    if (data) {
      var isPublished = data.post.isPublished ? data.post.isPublished : false;

      var postData = requestPostDataByLanguage(data.post, data.language);

      var editablePost = requestEditablePostContents(postData);

      this.setState({
        editor: {
          titleEditor: editablePost.title || createEditorStateWithText("asd"),
          summaryEditor:
            editablePost.summary || createEditorStateWithText("asd"),
          contentEditor:
            editablePost.content || createEditorStateWithText("asd"),
          isPublished
        }
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    let rawTitle = convertToRaw(
      this.state.title.getCurrentContent()
    );
    let rawContent = convertToRaw(
      this.state.content.getCurrentContent()
    );
    let rawSummary = convertToRaw(
      this.state.editor.summaryEditor.getCurrentContent()
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

  componentDidMount() {
    this.loadPostDataIntoState();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.loadPostDataIntoState();
    }
  }

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
              {/* <Editor
                id="summaryEditor"
                onChange={e => {
                  this.handleSummaryChange(e);
                }}
                editorState={this.state.editor.summaryEditor}
              /> */}
            </FormGroup>
            <FormGroup style={formGroupStyle}>
              <Label for="contentEditor" style={labelStyle}>
                Content
              </Label>
              <div className="abstractContent">
                <EditableRichText
                  name="content"
                  onUpdate={editorState => {
                    this.onUpdate(editorState, "content");
                  }}
                  initState={data.post}
                  isEditable={true}
                />
              </div>
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
