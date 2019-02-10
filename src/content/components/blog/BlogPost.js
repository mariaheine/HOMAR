import React from "react";
import { connect } from "react-redux";
import { firestoreConnect, getVal } from "react-redux-firebase";
import { compose } from "redux";
import { Editor } from "draft-js";
import moment from "moment";

import { requestDisplayablePostByLanguage } from "./../../../reduxStore/actions/helperActions";

import "./../../../styles/components/blog.css";

var outerHeaderContainer = {
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  background: "#58585852",
  padding: "0.2rem 0.5rem 0 0.2rem"
};

var innerHeaderContainer = {
  display: "flex",
  flexDirection: "column",
  paddingLeft: "1rem"
};

var avatarImage = {
  width: "64px",
  height: "64px",
  border: "2px solid black",
  borderRadius: "2px",
  margin: "0.5rem 0 0.5rem 0.5rem"
};

const BlogPost = props => {
  const { displayPost, author } = props;

  // console.log(displayPost);

  var date;
  if (displayPost.createdAt) {
    date = moment(displayPost.createdAt.toDate()).format("MMM Do YY");
  } else {
    date = "Some time ago";
  }

  return (
    // <div className="blogItem">
    //   <Editor
    //     readOnly="true"
    //     editorState={displayPost.title}
    //     placeholder="Whoops, a post should like totally display here 💔👽💦"
    //   />
    //   <Editor
    //     readOnly="true"
    //     editorState={displayPost.content}
    //     placeholder="Whoops, a post should like totally display here 💔👽💦"
    //   />
    // </div>
    <div className="outerContainer">
      <div className="blogContainer">
        <div className="postAbstract">
          <div className="abstractHeader" style={outerHeaderContainer}>
            <img style={avatarImage} src={author.avatarURL} />
            <div className="" style={innerHeaderContainer}>
              <div className="abstractTitle">
                <Editor
                  readOnly="true"
                  editorState={displayPost.title}
                  placeholder="EDITOR HERE"
                />
              </div>
              <span className="abstractDetails">{`${date} by ${
                author.nick
              }`}</span>
            </div>
          </div>
          <div className="abstractContent">
            <Editor
              readOnly="true"
              editorState={displayPost.content}
              placeholder="EDITOR HERE"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const postId = ownProps.match.params.postId;

  var post = getVal(state.firestore.data, `blogPosts/${postId}`);

  if (post) {
    var author = getVal(state.firestore.data, `users/${post.authorId}`);
    var createdAt = post.createdAt;
  }

  var nick = author ? author.nick : "null";

  var avatarURL = author ? author.avatarURL : null;

  // console.log(state);


  var displayPost = requestDisplayablePostByLanguage(
    post,
    state.language.selectedLanguage
  );
  
  // console.log(post);

  return {
    displayPost: {
      title: displayPost.title,
      content: displayPost.content,
      createdAt
    },
    author: {
      nick: nick,
      avatarURL: avatarURL
    }
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    // console.log(props)

    var postId = props.match.params.postId;

    return [
      { collection: "blogPosts", doc: `${postId}` },
      { collection: "users" }
    ];
  })
)(BlogPost);
