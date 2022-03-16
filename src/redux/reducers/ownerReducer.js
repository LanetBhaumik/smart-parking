const INITIAL_STATE = {
  profile: {},
};

export const OWNER_PROFILE = "OWNER_PROFILE";
export const OWNER_PROFILE_FAILED = "OWNER_PROFILE_FAILED";

export const ADD_PARKING_SUCCESS = "ADD_PARKING_SUCCESS";
export const ADD_PARKING_FAILED = "ADD_PARKING_FAILED";

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OWNER_PROFILE: {
      return {
        ...action.payload,
      };
    }
    case OWNER_PROFILE_FAILED: {
      return {
        ...action.payload,
      };
    }
    case ADD_PARKING_SUCCESS: {
      console.log("add parking success");
      return {
        ...action.payload,
      };
    }
    case ADD_PARKING_FAILED: {
      console.log("add parking failed");

      return {
        ...action.payload,
      };
    }

    default:
      return state;
  }
};
