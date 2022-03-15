import {
  userProfileService,
  userBookingsService,
} from "../services/userService.js";
import {
  USER_PROFILE,
  USER_BOOKINGS,
  USER_BOOKINGS_FAILED,
  USER_PROFILE_FAILED,
} from "../reducers/userReducer";

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
    if (error.response) {
      console.log(error.response);
      dispatch({
        type: USER_PROFILE_FAILED,
        payload: {
          error: error.response.data.error,
        },
      });
    }
  }
};

export const userBookings = () => async (dispatch, getState) => {
  try {
    const user = getState().user;
    const response = await userBookingsService();
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: USER_BOOKINGS,
        payload: { ...user, bookings: response.data },
      });
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      dispatch({
        type: USER_BOOKINGS_FAILED,
        payload: {
          error: error.response.data.error,
        },
      });
    }
  }
};

export default {
  userProfile,
  userBookings,
};
