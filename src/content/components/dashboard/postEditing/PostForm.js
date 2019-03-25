import React, { Component } from "react";
import { convertToRaw } from "draft-js";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import BlogPostTitle from "../../blog/components/BlogPostTitle";
import BlogPostSummary from "../../blog/components/BlogPostSummary";
import BlogPostContent from "../../blog/components/BlogPostContent";
import "./../../../../styles/components/blog.css";

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

    console.log(this.state.editor);

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

    if (data.isPublished !== undefined) {
      this.setState({
        editor: {
          isPublished: data.post.isPublished
        }
      });
    }
  }

  render() {
    const { data } = this.props;

    const checkboxStyle = {
      marginLeft: "-1.7rem"
    };

    const labelStyle = {
      width: "100%",
      backgroundColor: "#4e4e4e52",
      fontSize: "1.5rem",
      fontFamily: "Helvetica Neue, Arial",
      padding: "0.5rem"
    };

    const publishedInfoStyle = {
      fontSize: "0.9rem",
      color: "white",
      backgroundColor: "royalblue",
      margin: "0",
      padding: "0.5rem"
    };

    const publishedImgStyle = {
      height: "151px",
      width: "auto"
    };

    const unPublishedInfoStyle = {
      fontSize: "0.9rem",
      color: "white",
      backgroundColor: "DARKSLATEBLUE",
      margin: "0",
      padding: "0.5rem"
    };

    var isPublishedText = this.state.editor.isPublished ? (
      <p style={publishedInfoStyle}>
        <img src="https://i.gifer.com/JsF.gif" style={publishedImgStyle} />
        {"  "}🌼 Post jest live {`<3`}
      </p>
    ) : (
      <p style={unPublishedInfoStyle}>
        Post jest aktualnie ukryty/nieopublikowany 👥😎
      </p>
    );

    console.log(this.state.editor);

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="titleEditor" style={labelStyle}>
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
          <Label for="summaryEditor" style={labelStyle}>
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
          <Label for="contentEditor" style={labelStyle}>
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
        <Label style={labelStyle}>Mmmm? 😋🍰🍷</Label>
        <FormGroup check>
          <Label check style={labelStyle}>
            <Input
              type="checkbox"
              style={checkboxStyle}
              checked={this.state.editor.isPublished}
              onChange={() => {
                this.onUpdate(!this.state.editor.isPublished, "isPublished");
              }}
            />
            {isPublishedText}
          </Label>
        </FormGroup>
        <div>
          <br/>
          <Button color="primary">Zapisz zmiany, klik!</Button>
        </div>
      </Form>
    );
  }
}

export default PostForm;
