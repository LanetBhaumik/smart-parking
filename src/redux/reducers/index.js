import { combineReducers } from "redux";

import auth from "./authReducer";

import parkings from "./parkingReducer";
import alert from "./alertReducer";
import user from "./userReducer";
import owner from "./ownerReducer";
import bookings from "./bookingReducer";

export default combineReducers({
  auth,
  parkings,
  alert,
  owner,
  user,
  bookings,
});
