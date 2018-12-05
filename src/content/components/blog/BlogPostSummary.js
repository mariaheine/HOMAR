import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Temporary draft-js display using readonly Editor
import { Editor, EditorState, convertFromRaw } from "draft-js";

import "./../../../styles/components/blog/blogPost.css";

class BlogPostSummary extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.post)

    // const DataToDisplay = this.props.post.summary
    //   ? this.props.post.summary
    //   : this.props.post.content;

    // const DBEditorState = convertFromRaw(JSON.parse(DataToDisplay));

    console.log();

    // var DBEditorState;
    // if (this.props.post) {
    // }

    this.state = {
      // content: EditorState.createWithContent(DBEditorState)
    };
  }

  render() {
    return (
      <div className="blogItem">
        <Link to={`/blog/${this.props.post.id}`}>
          <h3>{this.props.postTitle}</h3>
          <Editor
            readOnly="true"
            // editorState={this.state.content}
            editorState={this.props.postContent}
            placeholder="EDITOR HERE"
          />
        </Link>
      </div>
    );
  }
}

const getEditorStateByLanguage = (post, language) => {
  let DBEditorState;

  let postTitle;
  let postContent;

  if (post) {
    var dataSource;
    switch (language) {
      case "pl":
        dataSource = post.polish;
        break;
      case "en":
        dataSource = post.english.title ? post.english : post.polish;
        break;
    }
    postTitle = dataSource.title;

    let DataToDisplay = dataSource.summary;
    let DataFromRaw = convertFromRaw(JSON.parse(DataToDisplay));
    postContent = EditorState.createWithContent(DataFromRaw);
  } else {
    postTitle = "🌊wait🐋for🐟🐳it💦";
    postContent = EditorState.createEmpty();
  }

  return {
    postContent: postContent,
    postTitle: postTitle
  };
};

const mapStateToProps = (state, ownProps) => {
  var result = getEditorStateByLanguage(
    ownProps.post,
    state.language.selectedLanguage
  );
  console.log(result);

  let DBEditorState;

  let postTitle;
  let postContent;

  if (ownProps.post) {
    var dataSource;
    switch (state.language.selectedLanguage) {
      case "pl":
        dataSource = ownProps.post.polish;
        break;
      case "en":
        dataSource = ownProps.post.english || ownProps.post.polish;
        break;
    }
    postTitle = dataSource.title;

    let DataToDisplay = dataSource.summary;
    let DataFromRaw = convertFromRaw(JSON.parse(DataToDisplay));
    postContent = EditorState.createWithContent(DataFromRaw);
  } else {
    postTitle = "🌊wait🐋for🐟🐳it💦";
    postContent = EditorState.createEmpty();
  }

  return {
    postContent: postContent,
    postTitle: postTitle
  };
};

export default connect(mapStateToProps)(BlogPostSummary);
