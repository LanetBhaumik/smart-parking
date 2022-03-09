import * as ownerAuthService from "../../redux/services/ownerAuth.js";
import { INVALID_OWNER, LOGIN_SUCCESSFUL, LOGOUT } from "../reducers/ownerAuth";

export const ownerLogIn = (Credentials) => {
  return (async function(dispatch) {
    try {
      const response = await ownerAuthService.ownerLogin(Credentials);
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        dispatch({
          type: LOGIN_SUCCESSFUL,
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
  });
};

export const ownerLogOut = ()=>{
  return (dispatch)=>{
    dispatch({
      type: LOGOUT
    })
    localStorage.removeItem("token");
  }
}

export default { ownerLogIn, ownerLogOut };