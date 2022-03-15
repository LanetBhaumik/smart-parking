const INITIAL_STATE = {
  profile: {},
  bookings: [],
};

export const USER_PROFILE = "USER_PROFILE";
export const USER_PROFILE_FAILED = "USER_PROFILE_FAILED";

export const USER_BOOKINGS = "USER_BOOKINGS";
export const USER_BOOKINGS_FAILED = "USER_BOOKINGS_FAILED";

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_PROFILE: {
      return {
        ...action.payload,
      };
    }
    case USER_BOOKINGS: {
      return {
        ...action.payload,
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

    default:
      return state;
  }
};
