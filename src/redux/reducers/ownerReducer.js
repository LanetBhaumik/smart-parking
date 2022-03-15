const INITIAL_STATE = {
  profile: {},
};

export const OWNER_PROFILE = "OWNER_PROFILE";
export const OWNER_PROFILE_FAILED = "OWNER_PROFILE_FAILED";

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

    default:
      return state;
  }
};
