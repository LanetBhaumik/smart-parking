import axios from "axios";
import { getWithExpiry } from "../../utils/localStorage";

export const baseURL = process.env.REACT_APP_API_BASE_URL;

const token = getWithExpiry("token");
axios.defaults.headers.common["Authorization"] = "Bearer " + token;

const baseService = axios.create({
  baseURL: baseURL,
});

export default baseService;
