import { SET_LINKED_URL, SET_EDITED_LANGUAGE } from "../types";

const initState = {
  linkedUrl: "https://www.homar.xyz/luckcharmsouch",
  editedLanguage: "pl"
};

const postEditReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LINKED_URL: {
      return {
        ...state,
        linkedUrl: action.linkedUrl
      };
    }
    case SET_EDITED_LANGUAGE:
      return {
        ...state,
        editedLanguage: action.editedLanguage
      };
    default:
      return state;
  }
};

export default postEditReducer;
