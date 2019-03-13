import {
  SET_EDITED_LANGUAGE,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  EDIT_POST_SUCCESS,
  EDIT_POST_ERROR,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR
} from "../types";

const initState = {
  postError: null,
  posts: [
    { id: "1", content: "Artice one" },
    { id: "2", content: "Article two" }
  ],
  editedLanguage: "pl"
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case CREATE_POST_SUCCESS:
      return state;
    case CREATE_POST_ERROR:
      return {
        ...state,
        postError: action.err
      };
    case EDIT_POST_SUCCESS:
      return state;
    case EDIT_POST_ERROR:
      return {
        ...state,
        postError: action.err
      };
    case DELETE_POST_SUCCESS:
      return state;
    case DELETE_POST_ERROR:
      return {
        ...state,
        postError: action.err
      };
    case SET_EDITED_LANGUAGE:
      return {
        ...state,
        editedLanguage: action.language
      };
    default:
      return state;
  }
};

export default postReducer;
