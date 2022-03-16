const INITIAL_STATE = [{}];

export const BOOKING_SUCCESS = "BOOKING_SUCCESS";
export const BOOKING_FAILED = "BOOKING_FAILED";
export const PARKING_BOOKINGS = "PARKING_BOOKINGS";
export const PARKING_BOOKINGS_FAILED = "PARKING_BOOKINGS_FAILED";

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BOOKING_SUCCESS: {
      return action.payload;
    }
    case BOOKING_FAILED: {
      return action.payload;
    }
    case PARKING_BOOKINGS: {
      return action.payload;
    }
    case PARKING_BOOKINGS_FAILED: {
      return action.payload;
    }
    default:
      return state;
  }
};
