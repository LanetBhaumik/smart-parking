import {
  userSignInService,
  userSignUpService,
  ownerSignInService,
  ownerSignUpService,
  getProfileService,
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

export const getProfile = () => async (dispatch) => {
  try {
    const response = await getProfileService();
    if (response.status === 200 && response.data.user) {
      return dispatch({
        type: USER_SIGNIN,
        payload: response.data,
      });
    } else if (response.status === 200 && response.data.owner) {
      return dispatch({
        type: OWNER_SIGNIN,
        payload: response.data,
      });
    }
  } catch (error) {
    if (error.response) {
      return dispatch({
        type: INVALID_DATA,
        payload: error.response.data,
      });
    }
  }
};

export const userSignIn = (Credentials) => async (dispatch) => {
  try {
    const response = await userSignInService(Credentials);
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      setAuthToken(response.data.token);
      return dispatch({
        type: USER_SIGNIN,
        payload: response.data,
      });
    }
  } catch (error) {
    if (error.response) {
      return dispatch({
        type: INVALID_DATA,
        payload: error.response.data,
      });
    }
  }
};

export const userSignUp = (userData) => async (dispatch) => {
  try {
    const response = await userSignUpService(userData);
    if (response.status === 201) {
      localStorage.setItem("token", response.data.token);
      setAuthToken(response.data.token);
      return dispatch({
        type: USER_SIGNUP,
        payload: response.data,
      });
    }
  } catch (error) {
    if (error.response) {
      return dispatch({
        type: INVALID_DATA,
        payload: error.response.data,
      });
    }
  }
};

export const ownerSignIn = (Credentials) => async (dispatch) => {
  try {
    const response = await ownerSignInService(Credentials);
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      setAuthToken(response.data.token);
      return dispatch({
        type: OWNER_SIGNIN,
        payload: response.data,
      });
    }
  } catch (error) {
    if (error.response) {
      return dispatch({
        type: INVALID_DATA,
        payload: error.response.data,
      });
    }
  }
};

export const ownerSignUp = (ownerData) => async (dispatch) => {
  try {
    const response = await ownerSignUpService(ownerData);
    if (response.status === 201) {
      localStorage.setItem("token", response.data.token);
      setAuthToken(response.data.token);
      return dispatch({
        type: OWNER_SIGNUP,
        payload: response.data,
      });
    }
  } catch (error) {
    if (error.response) {
      return dispatch({
        type: INVALID_DATA,
        payload: error.response.data,
      });
    }
  }
};

export const signOut = () => async (dispatch) => {
  localStorage.removeItem("token");

  setAuthToken();
  return dispatch({
    type: SIGNOUT,
  });
};

export default {
  userSignIn,
  ownerSignIn,
  userSignUp,
  ownerSignUp,
  signOut,
  getProfile,
};
