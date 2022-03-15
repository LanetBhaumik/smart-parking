const INITIAL_STATE = [{}];

export const BOOKING_SUCCESS = "BOOKING_SUCCESS";
export const BOOKING_FAILED = "BOOKING_FAILED";

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BOOKING_SUCCESS: {
      return action.payload;
    }
    case BOOKING_FAILED: {
      return action.payload;
    }
    default:
      return state;
  }
};
