import * as userAuthService from "../../redux/services/userAuth.js";
import {
  INVALID_USER,
  LOGIN_SUCCESSFUL,
  LOGOUT_SUCCESSFUL,
  SIGNUP_SUCCESSFUL,
} from "../reducers/userAuth";

export const userLogIn = (Credentials) => async (dispatch) => {
  try {
    const response = await userAuthService.userLogIn(Credentials);
    console.log(response);
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      dispatch({
        type: LOGIN_SUCCESSFUL,
        payload: { token: response.data.token, role: "user" },
      });
    }
  } catch (error) {
    if (error.response) {
      dispatch({
        type: INVALID_USER,
        data: {
          error_msg: error.response.data.error,
        },
      });
    }
  }
};

export const userSignUp = (userData) => async (dispatch) => {
  try {
    console.log(userData);
    const response = await userAuthService.userSignUp(userData);
    console.log(response);
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      dispatch({
        type: SIGNUP_SUCCESSFUL,
        payload: { token: response.data.token, role: "user" },
      });
    }
  } catch (error) {
    if (error.response) {
      dispatch({
        type: INVALID_USER,
        payload: {
          error_msg: error.response.data.error,
        },
      });
    }
  }
};

export const userLogOut = () => async (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESSFUL,
    payload: false,
  });
};
export default { userLogIn, userLogOut, userSignUp };
