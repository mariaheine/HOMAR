import authReducer from "./authReducer";
import postReducer from "./postReducer";
import langReducer from "./langReducer";

import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  language: langReducer,
  firestore: firestoreReducer
});

export default rootReducer;
