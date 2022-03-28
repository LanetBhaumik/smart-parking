import { newBookingService } from "../services/bookingService";
import { BOOKING_SUCCESS, BOOKING_FAILED } from "../reducers/bookingReducer";

export const bookSlot = (bookingData) => async (dispatch) => {
  try {
    const response = await newBookingService(bookingData);
    if (response.status === 200) {
      return dispatch({
        type: BOOKING_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    if (error.response) {
      return dispatch({
        type: BOOKING_FAILED,
        payload: {
          error: error.response.data.error,
        },
      });
    }
  }
};

export default { bookSlot };
