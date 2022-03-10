const INITIAL_STATE = {
  token: "",
  role: "",
  error_msg: "",
};

export const SIGNIN_SUCCESSFUL = "SIGNIN_SUCCESSFUL";
export const INVALID_OWNER = "INVALID_OWNER";
export const SIGNOUT = "SIGNOUT";

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESSFUL: {
      return Object.assign({}, state, {
        token: action.data.token,
        role: "owner",
      });
    }
    case INVALID_OWNER: {
      return Object.assign({}, state, { error_msg: action.data.error_msg });
    }
    case SIGNOUT: {
      return Object.assign({}, state, { token: "", role: "" });
    }

    default:
      return state;
  }
};
