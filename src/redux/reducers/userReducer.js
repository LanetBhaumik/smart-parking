const INITIAL_STATE = {
  profile: {},
  bookings: {},
};

export const USER_PROFILE = "USER_PROFILE";
export const USER_BOOKINGS = "USER_BOOKINGS";

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

    default:
      return state;
  }
};
