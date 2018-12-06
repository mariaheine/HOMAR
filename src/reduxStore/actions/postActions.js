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
          summary: post.rawSummary,
          content: post.rawContent
        },
        english: {
          title: "",
          summary: "",
          content: ""
        },
        author: "Marie",
        authorId: 5,
        createdAt: new Date()
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
    // console.log(postId + editedPost + language);

    var englishSend = {};
    var polish = {};

    if (language === "en") {
      console.log("english");
      englishSend.title = editedPost.title;
      englishSend.summary = editedPost.rawSummary;
      englishSend.content = editedPost.rawContent;
      console.log(englishSend);
    }

    // var firestoreGetById = firestore
    //   .collection("blogPosts")
    //   .doc(postId)
    //   .get()
    //   .then(doc => {
    //     if (doc.exists) {
    //       console.log(doc.data());
    //     }
    //   })
    //   .catch(err => {
    //     console.log("Error getting doooc): " + err);
    //   });

    firestore
      .collection("blogPosts")
      .doc(postId)
      .set(
        {
          english: englishSend
        },
        { merge: true }
      )
      .then(() => {
        console.log("Succesfull post update!");
      })
      .catch(err => {
        console.log("Error updating data: " + err);
      });
  };
};
