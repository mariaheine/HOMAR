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
    console.log(this.props.postTitle);

    return (
      <div className="blogItem">
        <h3>{this.props.postTitle}</h3>
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

  let postTitle;
  let postContent;

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
    postTitle = dataSource.title;

    let DataToDisplay = dataSource.content;
    let DataFromRaw = convertFromRaw(JSON.parse(DataToDisplay));
    postContent = EditorState.createWithContent(DataFromRaw);
  } else {
    postTitle = "🌊wait🐋for🐟🐳it💦"
    postContent = EditorState.createEmpty();
  }



  return {
    postContent: postContent,
    postTitle: postTitle
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "blogPosts" }])
)(BlogPost);
