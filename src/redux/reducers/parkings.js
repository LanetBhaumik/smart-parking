const INITIAL_STATE = [
    {
        "_id": "parking_id",
        "name": "parking_name",
        "slots": "parking_slots",
        "rate": "parking_rate",
        "address": "parking_address",
        "pincode": "parking_pincode",
        "owner": "parking_owner"
    }
]
export const PARKING_SUCCESS = "PARKING_SUCCESS";
export const PARKING_FAILED = "PARKING_FAILED"

export default (state = INITIAL_STATE, action)=>{
    switch (action.type) {
        case PARKING_SUCCESS:{
            return {success:PARKING_SUCCESS, data: action.payload}
        }
        case PARKING_FAILED:{
            return {success:PARKING_SUCCESS}
        }    
        default:
            return state;
    }
}
