const INITIAL_STATE = {};

export const PARKING_BOOKINGS_DATA = "PARKING_BOOKINGS_DATA";
export const PARKING_BOOKINGS_DATA_FAILED = "PARKING_BOOKINGS_DATA_FAILED";
export const SLOT_BOOKINGS_DATA = "SLOT_BOOKINGS_DATA";
export const SLOT_BOOKINGS_DATA_FAILED = "SLOT_BOOKINGS_DATA_FAILED";

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PARKING_BOOKINGS_DATA: {
      return { ...state, ...action.payload };
    }
    case PARKING_BOOKINGS_DATA_FAILED: {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    case SLOT_BOOKINGS_DATA: {
      const newState = { ...state };
      newState[action.payload.parkingId][action.payload.slot] =
        action.payload.bookings;
      return { ...newState };
    }
    case SLOT_BOOKINGS_DATA_FAILED: {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    default:
      return state;
  }
};
