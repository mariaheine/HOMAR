import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import moment from "moment";
import {
  firestoreConnect,
  getVal,
  firebaseConnect
} from "react-redux-firebase";
import EditableRichText from "../editable/EditableRichText";
import DisplayableRichText from "../displayable/DisplayableRichText";

const outerHeaderContainer = {
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  background: "#58585852",
  padding: "0.2rem"
};

const avatarImage = {
  width: "64px",
  height: "64px",
  border: "2px solid black",
  borderRadius: "2px",
  margin: "0.5rem 0 0.5rem 0.5rem"
};

const innerHeaderContainer = {
  display: "flex",
  flexDirection: "column",
  padding: "0.5rem 0 0.5rem 1rem",
  width: "100%"
};

class BlogPostTitle extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { author, isEditable, post } = this.props;

    // console.log(post);

    var Editor;
    if (isEditable) {
      Editor = (
        <EditableRichText
          name="title"
          onUpdate={editorState => {
            this.props.onUpdate(editorState, "title");
          }}
          initState={post}
        />
      );
    } else {
      Editor = <DisplayableRichText name="title" initState={post} />;
    }

    /* CHANGE DATE SETTING */
    // if it doesnt exist yet (because create ne post)
    // it should be saved only on first post publish

    const date = post.createdAt
      ? moment(this.props.post.createdAt.toDate()).format("MMM Do YY")
      : null;

    return (
      <div className="abstractHeader" style={outerHeaderContainer}>
        <div>
          <img alt="avateur" style={avatarImage} src={author.avatarURL} />
        </div>
        <div className="" style={innerHeaderContainer}>
          <div id="abstractTitle" className="abstractTitle">
            {Editor}
          </div>
          <span className="abstractDetails">{`${date} by ${author.nick}`}</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  var authorId = ownProps.post.authorId;

  var author = getVal(state.firestore.data, `users/${authorId}`);

  var nick = author ? author.nick : "null";

  var avatarURL = author ? author.avatarURL : null;

  // Check it!
  // It seems I get access to blogPosts thanks to the parent of this component
  // console.log(state.firestore.data);

  return {
    author: {
      nick: nick,
      avatarURL: avatarURL
    }
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    // console.log(props);
    return [{ collection: "users", doc: `${props.post.authorId}` }];
  })
)(BlogPostTitle);
