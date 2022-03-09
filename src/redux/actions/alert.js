import { RESET_ALERT, SET_ALERT } from "../reducers/alert";

export const setAlert = (severity, message) => async (dispatch) => {
  dispatch({
    type: SET_ALERT,
    payload: { severity, message },
  });
  setTimeout(() => {
    dispatch(RESET_ALERT);
  }, 2000);
};

export default { setAlert };
