import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect, getVal } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { Editor } from "draft-js";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";
import moment from "moment";

import { requestDisplayableContent } from "./../../../../reduxStore/actions/helperActions";

const styles = {
  postTabStyle: {
    width: "auto",
    padding: "0.2rem 0.5rem",
    margin: "0.2rem 0.2rem",
    display: "flex",
    alignItems: "center",
    background: "#272727bc"
  },
  newEditsNotification: {
    // width: "5%",
    margin: "0.2rem 0.2rem",
    marginLeft: "0",
    fontSize: "1.4rem",
    alignSelf: "flex-start",
    padding: "0",
    // paddingLeft: "0",
    // animation: "rotateEmoji 9s linear infinite"
  },
  postButtonStyle: {
    decoration: "none",
    flexGrow: "1"
  },
  tabDetailsStyle: {
    fontSize: "0.8rem",
    width: "15%",
    alignSelf: "flex-end",

  }
};

class EditablePostList extends Component {
  render() {
    const { posts, users, auth } = this.props;

    var listedPosts =
      posts &&
      posts.map(post => {
        const { moderatorViews } = post;

        let buttonAttributes = {
          outline: !post.isPublished,
          color: post.isPublished ? "primary" : "warning"
        };

        let author = users ? users[post.authorId] : null;

        let tabDetails = {
          authorNick: author ? author.nick : "Loading author nick",
          postAge: author ? moment(post.createdAt.toDate()).fromNow() : null
        };

        var newEditsInfo = null;
        if (moderatorViews) {
          // console.log(moderatorViews);
          newEditsInfo = moderatorViews.includes(auth.uid) ? (
            <div style={styles.newEditsNotification}>💎</div>
          ) : null;
        }

        // console.log(moderatorViews)
        // console.log(tabDetails);

        return (
          <div key={`Div${post.id}`} style={styles.postTabStyle}>
            {newEditsInfo}
            <Link
              key={`Link${post.id}`}
              to={{
                pathname: `/homaremenon/edit/${post.id}`,
                state: { postId: post.postId }
              }}
              style={styles.postButtonStyle}
            >
              <Button {...buttonAttributes} key={post.id}>
                <Editor
                  readOnly="true"
                  editorState={
                    requestDisplayableContent(post.polish.title).content
                  }
                  placeholder="EDITOR HERE"
                />
              </Button>
            </Link>
            <span style={styles.tabDetailsStyle}>
              {`${tabDetails.authorNick}`}
              <br />
              {`${tabDetails.postAge}`}
            </span>
          </div>
        );
      });

    return (
      <div className="">
        <h2>Blog posts 📝💬</h2>
        <div className="item">{listedPosts}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    posts: state.firestore.ordered.blogPosts,
    users: state.firestore.data.users,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "blogPosts", orderBy: ["createdAt", "desc"] },
    { collection: "users" }
  ])
)(EditablePostList);
