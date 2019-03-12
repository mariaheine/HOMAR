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
import {
  requestPostDataByLanguage,
  requestEditablePostContents
} from "../../../../reduxStore/actions/helperActions";

import { Editor, EditorState, convertToRaw } from "draft-js";

const outerHeaderContainer = {
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  background: "#58585852",
  padding: "0.2rem"
};

const innerHeaderContainer = {
  display: "flex",
  flexDirection: "column",
  margin: "0.5rem 0 0.5rem 0.5rem"
};

const avatarImage = {
  width: "64px",
  height: "64px",
  border: "2px solid black",
  borderRadius: "2px",
  margin: "0.5rem 0 0.5rem 0.5rem"
};

class BlogPostTitle extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   editableTitle: null
    // };
  }

//   componentDidMount() {
//     console.log("mount");

//     const { initState } = this.props;

//     var data = requestPostDataByLanguage(initState, "pl");

//     var editablePost = requestEditablePostContents(data);

//     this.setState({
//       editableTitle: editablePost
//     });
//   }

  render() {
    const { author, isEditable } = this.props;

    // console.log(this.props.post);

    var Editor;
    if (isEditable) {
      Editor = (
        <EditableRichText
          name="title"
          isEditable={true}
          onUpdate={editorState => {
            this.props.onUpdate(editorState, "title");
          }}
          initState={this.props.post}
          //   initState={this.props.editableTitle}
        />
      );
    }

    let date = moment(this.props.post.createdAt.toDate()).format("MMM Do YY");

    return (
      <div className="abstractHeader" style={outerHeaderContainer}>
        <img alt="avateur" style={avatarImage} src={author.avatarURL} />
        <div className="" style={innerHeaderContainer}>
          <div className="abstractTitle">
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
