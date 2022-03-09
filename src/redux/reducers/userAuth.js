const INITIAL_STATE = {
  token: "",
  role: "",
  error_msg: "",
};

export const SIGNUP_SUCCESSFUL = "SIGNUP_SUCCESSFUL";
export const LOGIN_SUCCESSFUL = "LOGIN_SUCCESSFUL";
export const LOGOUT_SUCCESSFUL = "LOGOUT_SUCCESSFUL";
export const INVALID_USER = "INVALID_USER";

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESSFUL: {
      return {
        ...INITIAL_STATE,
        token: action.payload.token,
        role: action.payload.role,
      };
    }
    case LOGIN_SUCCESSFUL: {
      return {
        ...INITIAL_STATE,
        token: action.payload.token,
        role: action.payload.role,
      };
    }
    case LOGOUT_SUCCESSFUL: {
      return { ...INITIAL_STATE, token: "", role: "" };
    }
    case INVALID_USER: {
      return { ...INITIAL_STATE, error_msg: action.payload.error_msg };
    }

    default:
      return state;
  }
};
