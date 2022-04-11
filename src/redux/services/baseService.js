import axios from "axios";
import { getWithExpiry } from "../../utils/localStorage";

export const baseURL = process.env.REACT_APP_API_BASE_URL;

const baseService = axios.create({
  baseURL: baseURL,
});

baseService.interceptors.request.use(
  function (config) {
    const token = getWithExpiry("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

baseService.interceptors.response.use(
  function (response) {
    if (response.data.token) {
      baseService.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default baseService;
