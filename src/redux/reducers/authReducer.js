const INITIAL_STATE = {};

export const USER_SIGNIN = "USER_SIGNIN";
export const USER_SIGNIN_SUCCESS = "USER_SIGNIN_SUCCESS";
export const USER_SIGNIN_ERROR = "USER_SIGNIN_ERROR";

export const OWNER_SIGNIN = "OWNER_SIGNIN";
export const OWNER_SIGNIN_SUCCESS = "OWNER_SIGNIN_SUCCESS";
export const OWNER_SIGNIN_ERROR = "OWNER_SIGNIN_ERROR";

export const USER_SIGNUP = "USER_SIGNUP";
export const OWNER_SIGNUP = "OWNER_SIGNUP";
export const SIGNOUT = "SIGNOUT";
export const INVALID_DATA = "INVALID_DATA";

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_SIGNIN_SUCCESS: {
      return {
        ...INITIAL_STATE,
        token: action.payload.token,
        role: "user",
        user: action.payload.user,
      };
    }
    case USER_SIGNUP: {
      return {
        ...INITIAL_STATE,
        token: action.payload.token,
        role: "user",
        user: action.payload.user,
      };
    }
    case OWNER_SIGNIN_SUCCESS: {
      return {
        ...INITIAL_STATE,
        token: action.payload.token,
        role: "owner",
        owner: action.payload.owner,
      };
    }
    case OWNER_SIGNUP: {
      return {
        ...INITIAL_STATE,
        token: action.payload.token,
        role: "owner",
        owner: action.payload.owner,
        parking: action.payload.parking,
      };
    }
    case SIGNOUT: {
      return { ...INITIAL_STATE };
    }
    case INVALID_DATA: {
      return { ...INITIAL_STATE, ...action.payload };
    }

    default:
      return state;
  }
};

export default authReducer;
