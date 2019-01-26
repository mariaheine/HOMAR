import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Editor } from "draft-js"; // Draft-js displaying using readonly Editor
import { Media } from "reactstrap";

import { requestDisplayablePostByLanguage } from "./../../../reduxStore/actions/helperActions";
import "./../../../styles/components/blog.css";

class BlogPostSummary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // content: EditorState.createWithContent(DBEditorState)
    };
  }

  render() {
    console.log(this.props.user);

    var outerHeaderContainer = {
      display: "flex",
      flexDirection: "row",
      background: "#58585852",
      padding: "0.2rem 0.5rem 0 0.2rem"
    };

    var innerHeaderContainer = {
      display: "flex",
      flexDirection: "column",
      paddingLeft: "1rem"
    };

    var avatarImage = {
      height: "64px",
      width: "auto",
      border: "2px solid black",
      borderRadius: "2px",
      margin: "0.5rem 0 0.5rem 0.5rem"
    };

    return (
      <div className="postAbstract">
        <Link to={`/blog/${this.props.post.id}`}>
          <div className="abstractHeader" style={outerHeaderContainer}>
            <img style={avatarImage} src={this.props.user.photoURL} />
            <div className="" style={innerHeaderContainer}>
              <div className="abstractTitle">
                <Editor
                  readOnly="true"
                  editorState={this.props.postTitle}
                  placeholder="EDITOR HERE"
                />
              </div>
              <span className="abstractDetails">
                {this.props.post.createdAt} by {this.props.post.authorId}
              </span>
            </div>
          </div>
        </Link>
        <div className="abstractContent">
          <Editor
            readOnly="true"
            editorState={this.props.postContent}
            placeholder="EDITOR HERE"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log(ownProps.post);

  var result = requestDisplayablePostByLanguage(
    ownProps.post,
    state.language.selectedLanguage
  );

  // REPLACE THIS WITH A BASIC USER DB
  var user = state.firebase.auth;

  // console.log(state);

  return {
    postContent: result.content,
    postTitle: result.title,
    user
  };
};

export default connect(mapStateToProps)(BlogPostSummary);
