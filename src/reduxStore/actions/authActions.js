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

export const signUp = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(response => {
        // console.log(response);
        return firestore
          .collection("users")
          .doc(response.user.uid)
          .set({
            nick: newUser.nick,
            avatarURL: newUser.avatarURL
          });
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};

export const editUser = userData => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    var user = firebase.auth().currentUser;

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
