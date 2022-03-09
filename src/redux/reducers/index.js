import { combineReducers } from "redux";
import auth from "./userAuth.js";
import parkings from "./parkings";
import alert from "./alert";

export default combineReducers({ auth, parkings, alert });
