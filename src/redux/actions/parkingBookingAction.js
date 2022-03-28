import {
  parkingBookingsService,
  parkingSlotBookingsService,
} from "../services/parkingBookingService";
import {
  PARKING_BOOKINGS_DATA,
  PARKING_BOOKINGS_DATA_FAILED,
  SLOT_BOOKINGS_DATA,
  SLOT_BOOKINGS_DATA_FAILED,
} from "../reducers/parkingBookingReducer";

export const fetchParkingBookings = (parkingId) => async (dispatch) => {
  try {
    const response = await parkingBookingsService(parkingId);
    if (response.status === 200) {
      return dispatch({
        type: PARKING_BOOKINGS_DATA,
        payload: { [parkingId]: response.data },
      });
    }
  } catch (error) {
    if (error.response) {
      return dispatch({
        type: PARKING_BOOKINGS_DATA_FAILED,
        payload: {
          error: error.response.data.error,
        },
      });
    }
  }
};

export const fetchParkingSlotBookings = (parkingId, slot) => async (
  dispatch
) => {
  try {
    const response = await parkingSlotBookingsService(parkingId, slot);
    if (response.status === 200) {
      return dispatch({
        type: SLOT_BOOKINGS_DATA,
        payload: { parkingId, slot, bookings: response.data },
      });
    }
  } catch (error) {
    if (error.response) {
      return dispatch({
        type: SLOT_BOOKINGS_DATA_FAILED,
        payload: {
          error: error.response.data.error,
        },
      });
    }
  }
};

export default { fetchParkingBookings, fetchParkingSlotBookings };
