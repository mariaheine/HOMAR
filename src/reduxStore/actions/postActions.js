import moment from "moment";

import {
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  EDIT_POST_SUCCESS,
  EDIT_POST_ERROR,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR
} from "../types";

export const createPost = post => {
  /*
    thunk.withExtraArgument({...}) at index.js
    lets us pass an extra argument below, after getState

    both getFirebase, getFirestore know where to connect
    to thanks to the redux firebase connection in index.js
    */
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    /* Pause dispatch, make async call to the database */

    const firestore = getFirestore();

    var user = getFirebase().auth().currentUser;

    firestore
      .collection("blogPosts")
      .add({
        polish: {
          title: post.title,
          summary: post.summary,
          content: post.content
        },
        english: {
          title: "",
          summary: "",
          content: ""
        },
        authorId: user.uid,
        createdAt: new Date()
      })
      .then(() => {
        dispatch({
          type: CREATE_POST_SUCCESS,
          post: post
        });
      })
      .catch(err => {
        dispatch({
          type: CREATE_POST_ERROR,
          err
        });
      });
  };
};

export const editPost = (postId, editedPost, language) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    var payload = {};
    if (language === "en") {
      payload.english = editedPost;
    } else if (language === "pl") {
      payload.polish = editedPost;
    } else {
      let err = "Firestore posts db incorrect language selection.";
      dispatch({
        type: EDIT_POST_ERROR,
        err
      });
      return;
    }

    /*

      I DON'T LIKE THIS THING BELOW.
      Could someone please tell me how to change that
      single line with payload?
    
    */

    if (language === "en") {
      firestore
        .collection("blogPosts")
        .doc(postId)
        .set(
          {
            english: payload.english
          },
          { merge: true }
        )
        .then(() => {
          dispatch({
            type: EDIT_POST_SUCCESS
          });
        })
        .catch(err => {
          dispatch({
            type: EDIT_POST_ERROR,
            err
          });
        });
    } else if (language === "pl") {
      firestore
        .collection("blogPosts")
        .doc(postId)
        .set(
          {
            polish: payload.polish
          },
          { merge: true }
        )
        .then(() => {
          dispatch({
            type: EDIT_POST_SUCCESS
          });
        })
        .catch(err => {
          dispatch({
            type: EDIT_POST_ERROR,
            err
          });
        });
    }
  };
};

export const deletePost = postId => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    
    firestore
      .collection("blogPosts")
      .doc(postId)
      .delete()
      .then(() => {
        dispatch({
          type: DELETE_POST_SUCCESS
        });
      })
      .catch(err => {
        dispatch({
          type: DELETE_POST_ERROR,
          err
        });
      });
  };
};
