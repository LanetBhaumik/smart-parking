import {
  newBookingService,
  deleteBookingService,
} from "../services/bookingService";

import {
  NEW_BOOKING,
  NEW_BOOKING_SUCCESS,
  NEW_BOOKING_ERROR,
  DELETE_BOOKING,
  DELETE_BOOKING_SUCCESS,
  DELETE_BOOKING_ERROR,
} from "../reducers/userReducer";

export const bookSlot = (bookingData) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_BOOKING,
    });
    const response = await newBookingService(bookingData);
    if (response.status === 200) {
      return dispatch({
        type: NEW_BOOKING_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    if (error.response) {
      return dispatch({
        type: NEW_BOOKING_ERROR,
        payload: {
          error: error.response.data.error,
        },
      });
    }
  }
};

export const deleteBooking = (bookingId) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_BOOKING,
    });
    const response = await deleteBookingService(bookingId);
    if (response.status === 200) {
      return dispatch({
        type: DELETE_BOOKING_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    if (error.response) {
      return dispatch({
        type: DELETE_BOOKING_ERROR,
        payload: {
          error: error.response.data.error,
        },
      });
    }
  }
};
