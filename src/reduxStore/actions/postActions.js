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
        title: post.title,
        content: post.rawContent,
        summary: post.rawSummary,
        polish: {
            title: "",
            summary: "",
            content: ""
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
