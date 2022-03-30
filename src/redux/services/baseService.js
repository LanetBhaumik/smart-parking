import axios from "axios";
import { getWithExpiry } from "../../utils/localStorage";

// export const baseURL = "https://smart-parking-backend-536.herokuapp.com";
export const baseURL = "http://localhost:3000";

const token = getWithExpiry("token");
axios.defaults.headers.common["Authorization"] = "Bearer " + token;

const baseService = axios.create({
  baseURL: baseURL,
});

export default baseService;
