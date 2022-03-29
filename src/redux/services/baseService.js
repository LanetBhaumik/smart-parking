import axios from "axios";

export const baseURL = "https://smart-parking-backend-536.herokuapp.com";

const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = "Bearer " + token;

const baseService = axios.create({
  baseURL: baseURL,
});

export default baseService;
