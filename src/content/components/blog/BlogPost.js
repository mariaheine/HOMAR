import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

// Temporary draft-js display using readonly Editor
import { Editor, EditorState, convertFromRaw } from "draft-js";

import "./../../../styles/components/blog/blogPost.css";

class BlogPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: EditorState.createEmpty()
    };
  }

  render() {
    const { postContent } = this.props;
    // console.log(this.props);
    // console.log(postContent);

    return (
      <div className="blogItem">
        <Editor
          readOnly="true"
          editorState={postContent}
          placeholder="Whoops, a post should like totally display here 💔👽💦"
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.postId;
  const posts = state.firestore.data.blogPosts;
  const post = posts ? posts[id] : null;

  let DBEditorState;

  if (post) {

    var dataSource;
    switch (state.language.selectedLanguage) {
      case "pl":
        dataSource = post.polish;
        break;
      case "en":
        dataSource = post.english ? post.english : post.polish;
        break;
      default:
        dataSource = post.polish;
        break;
    }

    // let DataToDisplay = post.content;
    let DataToDisplay = dataSource.content;

    let DataFromRaw = convertFromRaw(JSON.parse(DataToDisplay));
    DBEditorState = EditorState.createWithContent(DataFromRaw);
  } else {
    DBEditorState = EditorState.createEmpty();
  }

  return {
    postContent: DBEditorState
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "blogPosts" }])
)(BlogPost);
