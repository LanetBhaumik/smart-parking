import axios from "axios";

export const baseUrl = "http://localhost:3000";

const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = "Bearer " + token;

const baseService = axios.create({
  baseURL: baseUrl,
});

export default baseService;
