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
  borderRadius: "2px",
  margin: "0.5rem 0 0.5rem 0.5rem",
  backgroundSize: "contain"
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

    console.log(author);

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
      ? moment(this.props.post.createdAt).format("MMM Do YY")
      : null;

    return (
      <div className="abstractHeader" style={outerHeaderContainer}>
        <div>
          <div className={author.avatarCSSName} style={avatarImage}></div>
        </div>
        <div className="" style={innerHeaderContainer}>
          <div id="abstractTitle" className="abstractTitle">
            {Editor}
          </div>
          <span>
            <span className="abstractDetails author">{`${author.nick}`}</span>
            <span className="abstractDetails date">{` at ${date}`}</span>
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let authorId = ownProps.post.authorId;
  let author = state.staticDataReducer.users.find(user => user.id == authorId);
  return {author};
};

export default compose(
  connect(mapStateToProps)
)(BlogPostTitle);
