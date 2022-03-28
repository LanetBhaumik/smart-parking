import axios from "axios";

export const baseUrl = "https://peaceful-spire-05224.herokuapp.com";

const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = "Bearer " + token;

const baseService = axios.create({
  baseURL: baseUrl,
});

export default baseService;
