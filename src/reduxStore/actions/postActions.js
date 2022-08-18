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

    console.log(post)

    firestore
      .collection("blogPosts")
      .add({
        polish: {
          title: post.postContents.title,
          summary: post.postContents.summary,
          content: post.postContents.content
        },
        english: {
          title: "",
          summary: "",
          content: ""
        },
        isPublished: post.postData.isPublished,
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

export const editPost = (postId, editedPost, language, moderatorId) => {
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

    console.log(moderatorId)

    var postData = editedPost.postData
      firestore
        .collection("blogPosts")
        .doc(postId)
        .set(
          {
            isPublished: postData.isPublished,
            [targetLanguage]: payload[targetLanguage],
            moderatorViews: [moderatorId]
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

export const moderatorViewPost = (postId, moderatorId) => {
  return (dispatch, getState, { getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firestore
      .collection("blogPosts")
      .doc(postId)
      .update({
        moderatorViews: firebase.firestore.FieldValue.arrayUnion(moderatorId)
      })
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
  }
}

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
