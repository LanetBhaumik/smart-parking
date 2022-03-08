import * as userAuthService from "../services/userAuth.js";
import { INVALID_USER, LOGIN_SUCCESSFUL, LOGOUT } from "../reducers/userAuth";

export const userLogin = (Credentials) => {
  return (async function(dispatch) {
    try {
      const response = await userAuthService.login(Credentials);
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
          type: INVALID_USER,
          data: {
            error_msg: error.response.data.error,
          },
        });
      }
    }
  });
};

export const userLogout = ()=>{
  return (dispatch)=>{
    dispatch({
      type: LOGOUT
    })
    localStorage.removeItem("token");
  }
}

export default { userLogin, userLogout };