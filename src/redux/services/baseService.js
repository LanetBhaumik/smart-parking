import axios from "axios";
import store from "../store";

export const baseUrl = "http://localhost:3000";

(function() {
  const token = store.getState().auth.token;
  console.log({ token });
  if (token || localStorage.getItem("token")) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  }
})();

const baseService = axios.create({
  baseURL: baseUrl,
});

export default baseService;
