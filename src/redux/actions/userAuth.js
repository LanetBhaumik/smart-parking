import {
  signInService,
  signUpService,
  profileService,
} from "../../redux/services/userAuth.js";
import {
  INVALID_USER,
  SIGNIN_SUCCESSFUL,
  SIGNOUT_SUCCESSFUL,
  SIGNUP_SUCCESSFUL,
  USER_PROFILE,
} from "../reducers/userAuth";

export const userSignIn = (Credentials) => async (dispatch) => {
  try {
    const response = await signInService(Credentials);
    console.log(response);
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", "user");
      dispatch({
        type: SIGNIN_SUCCESSFUL,
        payload: { data: response.data, role: "user" },
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
    const response = await signUpService(userData);
    console.log(response);
    if (response.status === 201) {
      console.log("userSign up runs");
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", "user");
      dispatch({
        type: SIGNUP_SUCCESSFUL,
        payload: { data: response.data, role: "user" },
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

export const userProfile = () => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const response = await profileService();
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: USER_PROFILE,
        payload: { ...auth, user: response.data },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const userSignOut = () => async (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  dispatch({
    type: SIGNOUT_SUCCESSFUL,
  });
};

export default { userSignIn, userSignOut, userSignUp, userProfile };
