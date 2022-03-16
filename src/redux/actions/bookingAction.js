import {
  newBookingService,
  parkingBookingsService,
} from "../services/bookingService";
import {
  BOOKING_SUCCESS,
  BOOKING_FAILED,
  PARKING_BOOKINGS,
  PARKING_BOOKINGS_FAILED,
} from "../reducers/bookingReducer";

export const bookSlot = (bookingData) => async (dispatch) => {
  try {
    const response = await newBookingService(bookingData);
    console.log(response.data);
    if (response.status === 200) {
      dispatch({
        type: BOOKING_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      dispatch({
        type: BOOKING_FAILED,
        payload: {
          error: error.response.data.error,
        },
      });
    }
  }
};

export const parkingBookings = (parkingId) => async (dispatch, getState) => {
  try {
    const response = await parkingBookingsService(parkingId);
    console.log(response.data);
    if (response.status === 200) {
      dispatch({
        type: PARKING_BOOKINGS,
        payload: response.data,
      });
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      dispatch({
        type: PARKING_BOOKINGS_FAILED,
        payload: {
          error: error.response.data.error,
        },
      });
    }
  }
};

export default { bookSlot, parkingBookings };
