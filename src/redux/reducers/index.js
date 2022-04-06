import { combineReducers } from "redux";

import auth from "./authReducer";

import parkings from "./parkingReducer";
import alert from "./alertReducer";
import user from "./userReducer";
import owner from "./ownerReducer";
import parkingBookings from "./parkingBookingReducer";

const appReducer = combineReducers({
  auth,
  parkings,
  alert,
  owner,
  user,
  parkingBookings,
});

export const rootReducer = (state, action) => {
  if (action.type === "SIGNOUT") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};
