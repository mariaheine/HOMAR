import moment from 'moment';

export const createPost = post => {
  /*
    thunk.withExtraArgument({...}) at index.js
    lets us pass an extra argument below, after getState

    both getFirebase, getFirestore know where to connect
    to thanks to the redux firebase connection in index.js
    */
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    /* Pause dispatch, make async call to the database */

    // This gives us access to our firestore DB
    const firestore = getFirestore();

    firestore
      .collection("blogPosts")
      .add({
        // title: post.title,
        // content: post.rawContent,
        // summary: post.rawSummary,
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
        author: "Marie",
        authorId: 5,
        createdAt: moment().format("MMM Do YYYY")
      })
      .then(() => {
        /* Then continue and dispatch an action */
        dispatch({
          type: "CREATE_POST",
          post: post
        });
      })
      .catch(err => {
        dispatch({
          type: "CREATE_POST_ERROR",
          err
        });
      });
  };
};

export const editPost = (postId, editedPost, language) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    console.log("were here!");

    var payload = {};
    if (language === "en") {
      payload.english = editedPost;
    } else if (language === "pl") {
      payload.polish = editedPost;
    } else {
      console.log("Firestore posts db incorrect language selection.");
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
          console.log("Succesfull post update!");
        })
        .catch(err => {
          console.log("Error updating data: " + err);
        });
    } else if(language === "pl")
    {
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
          console.log("Succesfull post update!");
        })
        .catch(err => {
          console.log("Error updating data: " + err);
        });
    }
  };
};
