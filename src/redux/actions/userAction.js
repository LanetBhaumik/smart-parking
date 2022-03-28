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
    const response = await userProfileService();
    if (response.status === 200) {
      return dispatch({
        type: USER_PROFILE,
        payload: { ...user, profile: response.data },
      });
    }
  } catch (error) {
    if (error.response) {
      return dispatch({
        type: USER_PROFILE_FAILED,
        payload: {
          error: error.response.data.error,
        },
      });
    }
  }
};

export const userBookings = (limit, skip) => async (dispatch, getState) => {
  try {
    const user = getState().user;
    const response = await userBookingsService(limit, skip);
    if (response.status === 200) {
      return dispatch({
        type: USER_BOOKINGS,
        payload: {
          ...user,
          bookings: response.data.bookings,
          totalResults: response.data.totalResults,
        },
      });
    }
  } catch (error) {
    if (error.response) {
      return dispatch({
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
