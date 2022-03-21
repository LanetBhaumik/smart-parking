import axios from "axios";
import baseService from "../redux/services/baseService";

export const setAuthToken = (token) => {
  if (token) {
    baseService.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
