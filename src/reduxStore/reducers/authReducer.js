import { auth } from "firebase";

const initState = {
  authError: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      // console.log("Login error");
      return { ...state, authError: action.err };
    case "LOGIN_SUCCESS":
      // console.log("login cool");
      return { ...state, authError: null };
    case 'LOGOUT_SUCCESS':
      return state;
    default:
      return state;
  }
};

export default authReducer;
