import * as ownerAuthService from "../../redux/services/ownerAuth.js";
import {
  INVALID_OWNER,
  SIGNIN_SUCCESSFUL,
  SIGNOUT,
} from "../reducers/ownerAuth";

export const ownerSignIn = (Credentials) => {
  return async function(dispatch) {
    try {
      const response = await ownerAuthService.ownerSignIn(Credentials);
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        dispatch({
          type: SIGNIN_SUCCESSFUL,
          data: { token: response.data.token, role: "user" },
        });
      }
    } catch (error) {
      if (error.response) {
        dispatch({
          type: INVALID_OWNER,
          data: {
            error_msg: error.response.data.error,
          },
        });
      }
    }
  };
};

export const ownerSignOut = () => {
  return (dispatch) => {
    dispatch({
      type: SIGNOUT,
    });
    localStorage.removeItem("token");
  };
};

export default { ownerSignIn, ownerSignOut };
