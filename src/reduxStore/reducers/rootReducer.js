import authReducer from "./authReducer";
import postReducer from "./postReducer";
import langReducer from "./langReducer";
import postEditReducer from "./postEditReducer";
import staticDataReducer from "./staticDataReducer";

import { combineReducers } from "redux";
// import { firestoreReducer } from "redux-firestore";
// import { firebaseReducer } from "react-redux-firebase"

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  language: langReducer,
  postEdit: postEditReducer,
  // firestore: firestoreReducer,
  // firebase: firebaseReducer,
  staticDataReducer: staticDataReducer
});

export default rootReducer;
