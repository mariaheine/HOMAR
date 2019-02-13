import React, { Component } from "react";
import { Editor, EditorState, convertToRaw } from "draft-js";

// import "./../../../../styles/components/blog/blogContainer.css";
import "./../../../../styles/components/blog.css";

class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editor: {
        titleEditor: EditorState.createEmpty(),
        summaryEditor: EditorState.createEmpty(),
        contentEditor: EditorState.createEmpty()
      },
      staged: {
        title: "",
        summary: "",
        content: ""
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

  loadPostDataIntoState = () => {
    const { data } = this.props;

    if (data) {
      const title = data.title;
      const summary = data.summary;
      const content = data.content;

      this.setState({
        editor: {
          titleEditor: title || EditorState.createEmpty(),
          summaryEditor: summary || EditorState.createEmpty(),
          contentEditor: content || EditorState.createEmpty()
        }
      });
    }
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

  componentDidMount() {
    this.loadPostDataIntoState();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.loadPostDataIntoState();
    }
  }

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
}

export default PostForm;
