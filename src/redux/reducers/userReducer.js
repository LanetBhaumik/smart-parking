const INITIAL_STATE = {
  profile: {},
  bookings: [],
};

export const USER_PROFILE = "USER_PROFILE";
export const USER_PROFILE_FAILED = "USER_PROFILE_FAILED";

export const USER_BOOKINGS = "USER_BOOKINGS";
export const USER_BOOKINGS_FAILED = "USER_BOOKINGS_FAILED";

export const ADD_CAR = "ADD_CAR";
export const ADD_CAR_SUCCESS = "ADD_CAR_SUCCESS";
export const ADD_CAR_ERROR = "ADD_CAR_ERROR";

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_PROFILE: {
      return {
        ...state,
        profile: action.payload,
      };
    }
    case USER_BOOKINGS: {
      return {
        ...state,
        bookings: action.payload,
      };
    }
    case USER_PROFILE_FAILED: {
      return {
        ...action.payload,
      };
    }
    case USER_BOOKINGS_FAILED: {
      return {
        ...action.payload,
      };
    }
    case ADD_CAR: {
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

    default:
      return state;
  }
};
