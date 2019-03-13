import {
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  EDIT_POST_SUCCESS,
  EDIT_POST_ERROR,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR
} from "../types";

export const setEditedLanguage = language => ({
  type: "SET_EDITED_LANGUAGE",
  language: language
});

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

    if (language === "en") {
      var targetLanguage = "english";
    } else if (language === "pl") {      
      var targetLanguage = "polish"
    } else {
      let err = "editPost: incorrect language format";
      dispatch({
        type: EDIT_POST_ERROR,
        err
      });
      return;
    }
    
    var payload = {
      [targetLanguage]: editedPost.postContents
    }

    var postData = editedPost.postData
      firestore
        .collection("blogPosts")
        .doc(postId)
        .set(
          {
            isPublished: postData.isPublished,
            [targetLanguage]: payload[targetLanguage]
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
