import {
  userProfileService,
  userBookingsService,
} from "../services/userService.js";
import { USER_PROFILE, USER_BOOKINGS } from "../reducers/userReducer";

export const userProfile = () => async (dispatch, getState) => {
  try {
    const { user } = getState();
    console.log(user);
    const response = await userProfileService();
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: USER_PROFILE,
        payload: { ...user, profile: response.data },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const userBookings = () => async (dispatch, getState) => {
  try {
    const { user } = getState();
    const response = await userBookingsService();
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: USER_BOOKINGS,
        payload: { ...user, bookings: response.data },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export default {
  userProfile,
  userBookings,
};
