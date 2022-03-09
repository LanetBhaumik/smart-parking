const INITIAL_STATE = {
  severity: "",
  message: "",
};

export const SET_ALERT = "SET_ALERT";
export const RESET_ALERT = "RESET_ALERT";

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ALERT: {
      return {
        ...INITIAL_STATE,
        severity: action.payload.severity,
        message: action.payload.message,
      };
    }
    case RESET_ALERT: {
      return {
        ...INITIAL_STATE,
      };
    }

    default:
      return state;
  }
};
