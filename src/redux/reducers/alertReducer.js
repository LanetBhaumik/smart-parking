const INITIAL_STATE = {
  status: false,
};

export const SET_ALERT = "SET_ALERT";
export const RESET_ALERT = "RESET_ALERT";

const alertReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ALERT: {
      return {
        status: true,
        severity: action.payload.severity,
        message: action.payload.message,
      };
    }
    case RESET_ALERT: {
      return {
        status: false,
      };
    }

    default:
      return state;
  }
};
export default alertReducer;
