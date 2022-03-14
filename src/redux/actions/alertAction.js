import { RESET_ALERT, SET_ALERT } from "../reducers/alertReducer";

export const setAlert = (severity, message) => async (dispatch) => {
  dispatch({
    type: SET_ALERT,
    payload: { severity, message },
  });
};
export const resetAlert = () => async (dispatch) => {
  dispatch({
    type: RESET_ALERT,
  });
};

export default { setAlert, resetAlert };
