import {
  profileService,
  userBookingsService,
} from "../services/userService.js";
import { USER_PROFILE } from "../reducers/userReducer";

export const userProfile = () => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const response = await profileService();
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: USER_PROFILE,
        payload: { ...auth, user: response.data },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const userBookings = () => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const response = await userBookingsService();
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: USER_PROFILE,
        payload: { ...auth, userBookings: response.data },
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
