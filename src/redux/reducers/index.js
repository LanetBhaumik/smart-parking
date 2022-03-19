import { combineReducers } from "redux";

import auth from "./authReducer";

import parking from "./parkingReducer";
import alert from "./alertReducer";
import user from "./userReducer";
import owner from "./ownerReducer";
import bookings from "./bookingReducer";
import parkingBooking from "./parkingBookingReducer";

export default combineReducers({
  auth,
  parking,
  alert,
  owner,
  user,
  bookings,
  parkingBooking,
});
