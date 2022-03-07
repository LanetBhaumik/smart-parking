import * as authService from "../services/auth.js";
import { INVALID_USER, LOGIN_SUCCESSFUL, LOGOUT } from "../reducers/auth";

export const loginUser = (Credentials) => {
  return (async function(dispatch) {
    try {
      const response = await authService.login(Credentials);
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        dispatch({
          type: LOGIN_SUCCESSFUL,
          data: { token: response.data.token, role: "admin" },
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

export default { loginUser };