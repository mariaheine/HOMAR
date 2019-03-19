import React, { Component } from "react";
import { convertToRaw } from "draft-js";
import {
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import BlogPostTitle from "../../blog/components/BlogPostTitle";
import BlogPostSummary from "../../blog/components/BlogPostSummary";
import BlogPostContent from "../../blog/components/BlogPostContent";
import "./../../../../styles/components/blog.css";

class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editor: {
        title: null,
        summary: null,
        content: null,
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

  onUpdate = (value, target) => {

    this.props.onChange();

    this.setState(prevState => ({
      editor: {
        ...prevState.editor,
        [target]: value
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

  componentDidMount() {
    const { data } = this.props;

    this.setState({
      editor: {
        isPublished: data.post.isPublished
      }
    });
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
                  onChange={() => {
                    this.onUpdate(
                      !this.state.editor.isPublished,
                      "isPublished"
                    );
                  }}
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
