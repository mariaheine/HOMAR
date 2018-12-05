const initState = {
  selectedLanguage: "pl"
};

const langReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_LANGUAGE":
      // return { ...state, selectedLanguage: action.language };
      return Object.assign({}, state, {selectedLanguage: action.language})
    default:
      return state;
  }
};

export default langReducer;
