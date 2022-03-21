import {
  userSignInService,
  userSignUpService,
  ownerSignInService,
  ownerSignUpService,
} from "../services/authService";
import {
  USER_SIGNIN,
  USER_SIGNUP,
  OWNER_SIGNIN,
  OWNER_SIGNUP,
  SIGNOUT,
  INVALID_DATA,
} from "../reducers/authReducer";
import { setAuthToken } from "../../utils/setAuthToken";

export const userSignIn = (Credentials) => async (dispatch) => {
  try {
    const response = await userSignInService(Credentials);
    console.log("signin-----", response);
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", "user");
      setAuthToken(response.data.token);
      dispatch({
        type: USER_SIGNIN,
        payload: response.data,
      });
    }
  } catch (error) {
    if (error.response) {
      dispatch({
        type: INVALID_DATA,
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
    const response = await userSignUpService(userData);
    console.log(response);
    if (response.status === 201) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", "user");
      dispatch({
        type: USER_SIGNUP,
        payload: response.data,
      });
    }
  } catch (error) {
    if (error.response) {
      dispatch({
        type: INVALID_DATA,
        payload: error.response.data,
      });
    }
  }
};

export const ownerSignIn = (Credentials) => async (dispatch) => {
  try {
    const response = await ownerSignInService(Credentials);
    console.log(response);
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", "owner");
      dispatch({
        type: OWNER_SIGNIN,
        payload: response.data,
      });
    }
  } catch (error) {
    if (error.response) {
      dispatch({
        type: INVALID_DATA,
        data: {
          error_msg: error.response.data.error,
        },
      });
    }
  }
};

export const ownerSignUp = (ownerData) => async (dispatch) => {
  try {
    console.log(ownerData);
    const response = await ownerSignUpService(ownerData);
    console.log(response);
    if (response.status === 201) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", "owner");
      dispatch({
        type: OWNER_SIGNUP,
        payload: response.data,
      });
    }
  } catch (error) {
    if (error.response) {
      dispatch({
        type: INVALID_DATA,
        payload: error.response.data,
      });
    }
  }
};

export const signOut = () => async (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  dispatch({
    type: SIGNOUT,
  });
};

export default {
  userSignIn,
  ownerSignIn,
  userSignUp,
  ownerSignUp,
  signOut,
};
