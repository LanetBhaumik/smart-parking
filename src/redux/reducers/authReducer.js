const INITIAL_STATE = {
  token: "",
  role: "",
  error_msg: "",
  user: {},
  owner: {},
};

export const USER_SIGNIN = "USER_SIGNIN";
export const USER_SIGNUP = "USER_SIGNUP";
export const OWNER_SIGNIN = "OWNER_SIGNIN";
export const OWNER_SIGNUP = "OWNER_SIGNUP";
export const SIGNOUT = "SIGNOUT";
export const INVALID_DATA = "INVALID_DATA";

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_SIGNIN: {
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
    case OWNER_SIGNIN: {
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
      return { ...INITIAL_STATE, error_msg: "Invalid Data" };
    }

    default:
      return state;
  }
};
