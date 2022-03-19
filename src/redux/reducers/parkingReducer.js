const INITIAL_STATE = {
  list: [
    {
      _id: "parking_id",
      name: "parking_name",
      slots: "parking_slots",
      rate: "parking_rate",
      address: "parking_address",
      pincode: "parking_pincode",
      owner: "parking_owner",
    },
  ],
};

export const PARKING_SUCCESS = "PARKING_SUCCESS";
export const PARKING_FAILED = "PARKING_FAILED";
export const PARKING_DETAIL_SUCCESS = "PARKING_DETAIL_SUCCESS";
export const PARKING_DETAIL_FAILED = "PARKING_DETAIL_FAILED";

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PARKING_SUCCESS: {
      console.log(state);
      return action.payload;
    }
    case PARKING_FAILED: {
      return action.payload;
    }
    case PARKING_DETAIL_SUCCESS: {
      return action.payload;
    }
    case PARKING_DETAIL_FAILED: {
      return action.payload;
    }
    default:
      return state;
  }
};
