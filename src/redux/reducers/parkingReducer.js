const INITIAL_STATE = [];

export const PARKING_SUCCESS = "PARKING_SUCCESS";
export const PARKING_FAILED = "PARKING_FAILED";
export const PARKING_DETAIL_SUCCESS = "PARKING_DETAIL_SUCCESS";
export const PARKING_DETAIL_FAILED = "PARKING_DETAIL_FAILED";

const parkingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PARKING_SUCCESS: {
      return [...state, ...action.payload.parkings];
    }
    case PARKING_FAILED: {
      return action.payload;
    }
    case PARKING_DETAIL_SUCCESS: {
      return [...state, action.payload];
    }
    case PARKING_DETAIL_FAILED: {
      return action.payload;
    }
    default:
      return state;
  }
};
export default parkingReducer;
