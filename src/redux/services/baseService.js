import axios from "axios";

export const baseURL = process.env.API_BASE_URL;

const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = "Bearer " + token;

const baseService = axios.create({
  baseURL: baseURL,
});

export default baseService;
