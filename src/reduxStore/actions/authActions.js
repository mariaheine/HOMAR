export const signIn = credentials => {
  /* Again to remind myself, because of thunk we can hold a 
     dispatch process and return a function (right below) instead
     */

  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    console.log(credentials);

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "LOGOUT_SUCCESS" });
      });
  };
};
