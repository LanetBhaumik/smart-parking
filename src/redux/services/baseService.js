import axios from "axios";

// export const baseURL = "https://peaceful-spire-05224.herokuapp.com";
export const baseURL = "http://localhost:3000";

const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = "Bearer " + token;

const baseService = axios.create({
  baseURL: baseURL,
});

export default baseService;
