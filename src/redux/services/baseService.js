import axios from "axios";
import store from "../store";

export const baseUrl = "http://localhost:3000";

(function() {
  const token = store.getState().auth.token;
  if (token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    axios.defaults.headers.common["Authorization"] = null;
    /*if setting null does not remove `Authorization` header then try     
        delete axios.defaults.headers.common['Authorization'];
      */
  }
})();

const baseService = axios.create({
  baseURL: baseUrl,
});

export default baseService;
