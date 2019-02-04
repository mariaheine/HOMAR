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
            avatarURL: newUser.avatarURL,
            registeredAt: new Date()
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

// DISABLED

// export const grantSUDO = email => {
//   return (dispatch, getState, { getFirebase }) => {
//     const firebase = getFirebase();
//     console.log(email);
//     const grantSudoClaims = firebase
//       .functions()
//       .httpsCallable("grantSudoClaims");
//     grantSudoClaims({ email: email })
//       .then(result => {
//         console.log(result);
//         dispatch({ type: "USER_GRANT_ADMIN_SUCCESS" });
//       })
//       .catch(err => {
//         dispatch({ type: "USER_GRANT_ADMIN_ERROR", err });
//       });
//   };
// };

export const grantMOD = email => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    const grantSudoClaims = firebase
      .functions()
      .httpsCallable("grantModClaims");

    grantSudoClaims({ email: email })
      .then(result => {
        // console.log(result);
        dispatch({ type: "USER_GRANT_ADMIN_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "USER_GRANT_ADMIN_ERROR", err });
      });
  };
};

