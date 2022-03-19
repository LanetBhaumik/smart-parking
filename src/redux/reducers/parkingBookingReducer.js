const INITIAL_STATE = {};

export const PARKING_BOOKINGS_DATA = "PARKING_BOOKINGS_DATA";
export const PARKING_BOOKINGS_DATA_FAILED = "PARKING_BOOKINGS_DATA_FAILED";

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PARKING_BOOKINGS_DATA: {
      console.log("action------", state, "payload--------", action.payload);
      return { ...state, ...action.payload };
    }
    case PARKING_BOOKINGS_DATA_FAILED: {
      return {
        ...state,

        error: action.payload.error,
      };
    }
    default:
      return state;
  }
};
