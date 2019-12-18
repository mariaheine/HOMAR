import React, { Component } from "react";
import { convertToRaw } from "draft-js";
import { Form, FormGroup, Label, Input, Button, Spinner } from "reactstrap";
import BlogPostTitle from "../../blog/components/BlogPostTitle";
import BlogPostSummary from "../../blog/components/BlogPostSummary";
import BlogPostContent from "../../blog/components/BlogPostContent";
import "./../../../../styles/components/blog.css";

import TestEditor from "../../blog/editable/TestEditor";

class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editor: {
        title: "",
        summary: "",
        content: "",
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

    // console.log(this.state.editor);

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

    // console.log(data)

    if (data.post.isPublished !== undefined) {
      // console.log(data.isPublished)
      this.setState({
        editor: {
          isPublished: data.post.isPublished
        }
      });
    }
  }

  render() {
    // return <TestEditor/>

    const { data } = this.props;

    var isPublishedText = this.state.editor.isPublished ? (
      <p style={styles.publishedInfoStyle}>
        <img
          src="https://i.gifer.com/JsF.gif"
          style={styles.publishedImgStyle}
        />
        {"  "}🌼 Post jest live {`<3`}
      </p>
    ) : (
      <p style={styles.unPublishedInfoStyle}>
        Post jest aktualnie ukryty/nieopublikowany 👥😎 [klik!]
      </p>
    );

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="titleEditor" style={styles.labelStyle}>
              💛 Title
            </Label>
            <BlogPostTitle
              post={data.post}
              isEditable={true}
              onUpdate={editorState => {
                this.onUpdate(editorState, "title");
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="summaryEditor" style={styles.labelStyle}>
              💙 Summary
            </Label>
            <BlogPostSummary
              post={data.post}
              isEditable={true}
              onUpdate={editorState => {
                this.onUpdate(editorState, "summary");
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="contentEditor" style={styles.labelStyle}>
              💜 Content
            </Label>
            <BlogPostContent
              post={data.post}
              isEditable={true}
              onUpdate={editorState => {
                this.onUpdate(editorState, "content");
              }}
            />
          </FormGroup>
          <Label style={styles.labelStyle}>🍰🍷</Label>
          <FormGroup>
            <Label
              check
              style={styles.labelStyle}
              onMouseDown={() => {
                this.onUpdate(!this.state.editor.isPublished, "isPublished");
              }}
            >
              {isPublishedText}
            </Label>
            <div style={styles.bottomBarStyle}>
              <Button style={styles.saveButtonStyle} color="primary">
                Zapisz zmiany, klik!
              </Button>
            </div>
          </FormGroup>
          <div />
        </Form>
      </div>
    );
  }
}

const styles = {
  bottomBarStyle: {
    width: "100%",
    display: "flex",
    margin: "0.5rem",
    marginTop: "1rem"
  },
  saveButtonStyle: {
    margin: "auto"
  },
  checkboxStyle: {
    marginLeft: "-1.7rem"
  },
  labelStyle: {
    width: "100%",
    backgroundColor: "#4e4e4e52",
    fontSize: "1.5rem",
    fontFamily: "Helvetica Neue, Arial",
    padding: "0.5rem"
  },
  publishedInfoStyle: {
    fontSize: "0.9rem",
    color: "white",
    backgroundColor: "royalblue",
    margin: "0",
    padding: "0.5rem"
  },
  publishedImgStyle: {
    height: "151px",
    width: "auto"
  },
  unPublishedInfoStyle: {
    fontSize: "0.9rem",
    color: "white",
    backgroundColor: "DARKSLATEBLUE",
    margin: "0",
    padding: "0.5rem"
  }
};

export default PostForm;
