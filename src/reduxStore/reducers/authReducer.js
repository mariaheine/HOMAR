import {
  CLEAR_USER_STATE,
  CHECK_CLAIMS,
  CHECK_CLAIMS_SUCCESS,
  CHECK_CLAIMS_ERROR
} from "../types";

export const initState = {
  isFetching: "",
  authError: null,
  user: {
    // claims: {
    //   isMod: null,
    //   isSudo: null
    // }
  }
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      // console.log("Login error");
      return { ...state, authError: action.err };
    case "LOGIN_SUCCESS":
      // console.log("login cool");
      return { ...state, authError: null };
    case "LOGOUT_SUCCESS":
      return { ...state, user: initState.user };

    case "SIGNUP_ERROR":
      // console.log("signup error!");
      return {
        ...state,
        authError: action.err.message
      };
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        authError: null
      };

    case CHECK_CLAIMS:
      console.log(action.payload);
      return Object.assign({}, state, { isFetching: true });
    case CHECK_CLAIMS_SUCCESS:
      console.log(action.payload);
      return Object.assign({}, state, {
        isFetching: false,
        // user: { claims: action.payload }        
        user: action.payload 
      });
    case CHECK_CLAIMS_ERROR:
      console.log(action.err);
      return {
        ...state,
        authError: action.err
      };

    case "USEREDIT_SUCCESS":
      return { ...state, authError: null };
    case "USEREDIT_ERROR":
      return { ...state, authError: action.err };

    case "USER_GRANT_ADMIN_SUCCESS":
      return state;
    case "USER_GRANT_ADMIN_ERROR":
      return { ...state, authError: action.err };
    default:
      return state;
  }
};

export default authReducer;
