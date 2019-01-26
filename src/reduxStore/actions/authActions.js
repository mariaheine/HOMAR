export const signIn = credentials => {
  /* Again to remind myself, because of thunk we can hold a 
     dispatch process and return a function (right below) instead
     */

  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    // console.log(credentials);

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

export const editUser = userData => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    var user = firebase.auth().currentUser;

    console.log(user);
    console.log(userData);


    user
      .updateProfile({
        displayName: userData.nick,
        photoURL: userData.url
      })
      .then(() => {
        dispatch({ type: "USEREDIT_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "USEREDIT_ERROR", err });
      });
  };
};
