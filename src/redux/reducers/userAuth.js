const INITIAL_STATE = {
  token: "",
  role: "",
  error_msg: "",
  user: {},
};

export const SIGNUP_SUCCESSFUL = "SIGNUP_SUCCESSFUL";
export const SIGNIN_SUCCESSFUL = "SIGNIN_SUCCESSFUL";
export const SIGNOUT_SUCCESSFUL = "SIGNOUT_SUCCESSFUL";
export const INVALID_USER = "INVALID_USER";
export const USER_PROFILE = "USER_PROFILE";

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESSFUL: {
      return {
        ...INITIAL_STATE,
        token: action.payload.data.token,
        role: action.payload.role,
        user: action.payload.data.user,
      };
    }
    case SIGNIN_SUCCESSFUL: {
      return {
        ...INITIAL_STATE,
        token: action.payload.data.token,
        role: action.payload.role,
        user: action.payload.data.user,
      };
    }
    case SIGNOUT_SUCCESSFUL: {
      return { ...INITIAL_STATE };
    }
    case INVALID_USER: {
      return { ...INITIAL_STATE, error_msg: action.payload.error_msg };
    }
    case USER_PROFILE: {
      return {
        ...INITIAL_STATE,
      };
    }

    default:
      return state;
  }
};
