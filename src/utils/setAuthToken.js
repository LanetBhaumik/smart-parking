import baseService from "../redux/services/baseService";

export const setAuthToken = (token) => {
  if (token) {
    baseService.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    delete baseService.defaults.headers.common["Authorization"];
  }
};
