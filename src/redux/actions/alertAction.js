import { RESET_ALERT, SET_ALERT } from "../reducers/alertReducer";

export const setAlert = (severity, message) => async (dispatch) => {
  return dispatch({
    type: SET_ALERT,
    payload: { severity, message },
  });
};
export const resetAlert = () => async (dispatch) => {
  return dispatch({
    type: RESET_ALERT,
  });
};

export default { setAlert, resetAlert };
