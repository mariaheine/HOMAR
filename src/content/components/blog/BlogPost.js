import React from "react";
import { connect } from "react-redux";
import { firestoreConnect, getVal } from "react-redux-firebase";
import { compose } from "redux";
import { Editor } from "draft-js";
import moment from "moment";
import ShareButtons from "./components/ShareButtons";
import { Button } from "reactstrap";

import { requestDisplayablePostByLanguage } from "./../../../reduxStore/actions/helperActions";

import "./../../../styles/components/blog.css";

var outerHeaderContainer = {
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  background: "#58585852",
  padding: "0.2rem"
};

var innerHeaderContainer = {
  display: "flex",
  flexDirection: "column",
  margin: "0.5rem 0 0.5rem 0.5rem"
};

var avatarImage = {
  width: "64px",
  height: "64px",
  border: "2px solid black",
  borderRadius: "2px",
  margin: "0.5rem 0 0.5rem 0.5rem"
};

var moveRight = {
  marginLeft: "auto"
};

const BlogPost = props => {
  const { displayPost, author } = props;
  
  document.body.scrollTop = 0;

  var date;
  if (displayPost.createdAt) {
    date = moment(displayPost.createdAt.toDate()).format("MMM Do YY");
  } else {
    date = "Some time ago";
  }

  return (
      <div className="container">
        <div className="postAbstract">
          <div className="abstractHeader" style={outerHeaderContainer}>
            <img alt="avatar" style={avatarImage} src={author.avatarURL} />
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
              editorState={displayPost.displayedContent}
              placeholder="EDITOR HERE"
            />
          </div>
          <div className="abstractFooter">
            <Button id="submit1" color="info" onClick={props.history.goBack}>
              Go back
            </Button>
            <div style={moveRight}>
              <ShareButtons
                displayPost={displayPost}
                postId={props.match.params.postId}
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

  var whatToDisplay = displayPost.hasContent
    ? displayPost.content
    : displayPost.summary;

  return {
    displayPost: {
      title: displayPost.title,
      displayedContent: whatToDisplay,
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
