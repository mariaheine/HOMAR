import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { Editor } from "draft-js"; // Draft-js displaying using readonly Editor
import { Button } from "reactstrap";
import moment from "moment";
import { requestDisplayablePostByLanguage } from "./../../../reduxStore/actions/helperActions";
import "./../../../styles/components/blog.css";
import { firestoreConnect, getVal } from "react-redux-firebase";
import ShareButtons from "./components/ShareButtons";

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
  paddingLeft: "1rem"
};

var avatarImage = {
  width: "64px",
  height: "64px",
  border: "2px solid black",
  borderRadius: "2px",
  margin: "0.5rem 0 0.5rem 0.5rem"
};

var rightFooter = {
  marginLeft: "auto"
};

class BlogPostSummary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // content: EditorState.createWithContent(DBEditorState)
    };
  }

  render() {
    const { author, displayPost } = this.props;

    // console.log(displayPost);

    let date = moment(this.props.post.createdAt.toDate()).format("MMM Do YY");

    var ReadMore;
    if (displayPost.hasContent) {
      ReadMore = (
        <div>
          <Link to={`/blog/${this.props.post.id}`}>
            <Button color="danger">Read more</Button>
          </Link>
        </div>
      );
    }

    return (
      <div className="postAbstract">
        <Link to={`/blog/${this.props.post.id}`}>
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
              <span className="abstractDetails">
                {`${date} by ${author.nick}`}
              </span>
            </div>
          </div>
        </Link>
        <div className="abstractContent">
          <Editor
            readOnly="true"
            editorState={displayPost.displayedContent}
            placeholder="EDITOR HERE"
          />
        </div>
        <div className="abstractFooter">
          <div>{ReadMore}</div>
          <div style={rightFooter}>
            <ShareButtons
              displayPost={displayPost}
              postId={this.props.post.id}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  var result = requestDisplayablePostByLanguage(
    ownProps.post,
    state.language.selectedLanguage
  );

  var authorId = ownProps.post.authorId;

  var author = getVal(state.firestore.data, `users/${authorId}`);

  var nick = author ? author.nick : "null";

  var avatarURL = author ? author.avatarURL : null;

  // It seems I get access to blogPosts thanks to the parent of this component
  // console.log(state.firestore.data);

  return {
    displayPost: {
      title: result.title,
      displayedContent: result.summary,
      hasContent: result.hasContent
    },
    author: {
      nick: nick,
      avatarURL: avatarURL
    }
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => [
    { collection: "users", doc: `${props.post.authorId}` }
  ])
)(BlogPostSummary);

// ANOTHER WAY:

// const enhance = compose(
//   // firestoreConnect(["users"]),
//   firestoreConnect(props => [
//     { collection: "users", doc: `${props.post.authorId}` }
//   ]),
//   connect((state, ownProps) => {
//     // var result = requestDisplayablePostByLanguage(
//     //   ownProps.post,
//     //   state.language.selectedLanguage
//     // );
//     console.log(state);
//     return {
//       // user: getVal(firestore, `data/users/${ownProps.post.authorId}`)
//     };
//   })
// );
// export default enhance(BlogPostSummary);
