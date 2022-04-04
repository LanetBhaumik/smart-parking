const INITIAL_STATE = {
  profile: {},
  bookings: [],
};

export const USER_PROFILE = "USER_PROFILE";
export const USER_PROFILE_FAILED = "USER_PROFILE_FAILED";

export const USER_BOOKINGS = "USER_BOOKINGS";
export const USER_BOOKINGS_SUCCESS = "USER_BOOKINGS_SUCCESS";
export const USER_BOOKINGS_ERROR = "USER_BOOKINGS_ERROR";

export const ADD_CAR = "ADD_CAR";
export const ADD_CAR_SUCCESS = "ADD_CAR_SUCCESS";
export const ADD_CAR_ERROR = "ADD_CAR_ERROR";

export const DELETE_CAR = "DELETE_CAR";
export const DELETE_CAR_SUCCESS = "DELETE_CAR_SUCCESS";
export const DELETE_CAR_ERROR = "DELETE_CAR_ERROR";

export const PRIMARY_CAR = "PRIMARY_CAR";
export const PRIMARY_CAR_SUCCESS = "PRIMARY_CAR_SUCCESS";
export const PRIMARY_CAR_ERROR = "PRIMARY_CAR_ERROR";

export const NEW_BOOKING = "NEW_BOOKING";
export const NEW_BOOKING_SUCCESS = "NEW_BOOKING_SUCCESS";
export const NEW_BOOKING_ERROR = "NEW_BOOKING_ERROR";

export const DELETE_BOOKING = "DELETE_BOOKING";
export const DELETE_BOOKING_SUCCESS = "DELETE_BOOKING_SUCCESS";
export const DELETE_BOOKING_ERROR = "DELETE_BOOKING_ERROR";

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_PROFILE: {
      return {
        ...state,
        profile: action.payload,
      };
    }
    case USER_BOOKINGS_SUCCESS: {
      return {
        ...state,
        bookings: action.payload.bookings,
      };
    }
    case USER_PROFILE_FAILED: {
      return {
        ...action.payload,
      };
    }
    case ADD_CAR_SUCCESS: {
      return {
        ...state,
        profile: action.payload,
      };
    }
    case ADD_CAR_ERROR: {
      return {
        ...action.payload,
      };
    }
    case DELETE_CAR_SUCCESS: {
      return {
        ...state,
        profile: action.payload,
      };
    }
    case DELETE_CAR_ERROR: {
      return {
        ...action.payload,
      };
    }
    case PRIMARY_CAR_SUCCESS: {
      return {
        ...state,
        profile: action.payload,
      };
    }
    case PRIMARY_CAR_ERROR: {
      return {
        ...action.payload,
      };
    }
    case NEW_BOOKING_SUCCESS: {
      return action.payload;
    }
    case NEW_BOOKING_ERROR: {
      return {
        ...action.payload,
      };
    }
    case DELETE_BOOKING_SUCCESS: {
      return {
        ...state,
      };
    }
    case DELETE_BOOKING_ERROR: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
