import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

// Temporary draft-js display using readonly Editor
import { Editor, EditorState, convertFromRaw } from "draft-js";

import {requestDisplayablePostByLanguage} from './../../../reduxStore/actions/helperActions'

import { setLanguage } from "./../../../reduxStore/actions/langActions";

import "./../../../styles/components/blog/blogPost.css";

class BlogPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: EditorState.createEmpty()
    };
  }

  changelang = () => {
    this.props.setLanguage('en');
  }

  render() {
    const { post } = this.props;
    // console.log(post);
    // console.log(this.props.displayablePost.postContent);

    return (
      <div className="blogItem">
        <h3>{post.title}</h3>
        <Editor
          readOnly="true"
          editorState={post.content}
          placeholder="Whoops, a post should like totally display here 💔👽💦"
        />
        <button onClick={this.changelang}>asdaslk kdslkd</button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {

  const id = ownProps.match.params.postId;
  const posts = state.firestore.data.blogPosts;
  const post = posts ? posts[id] : null;

  var displayablePost = requestDisplayablePostByLanguage(post, state.language.selectedLanguage)

  return {
    post: displayablePost
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLanguage: language => dispatch(setLanguage(language))
  };
};

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect([{ collection: "blogPosts" }])
)(BlogPost);
