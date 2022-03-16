const INITIAL_STATE = [
  {
    _id: "parking_id",
    name: "parking_name",
    slots: "parking_slots",
    rate: "parking_rate",
    address: "parking_address",
    pincode: "parking_pincode",
    owner: "parking_owner",
  },
];

export const PARKING_SUCCESS = "PARKING_SUCCESS";
export const PARKING_FAILED = "PARKING_FAILED";

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PARKING_SUCCESS: {
      return action.payload;
    }
    case PARKING_FAILED: {
      return action.payload;
    }
    default:
      return state;
  }
};
