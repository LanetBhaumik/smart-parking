import {
  ownerProfileService,
  addParkingService,
} from "../services/ownerService.js";

import {
  OWNER_PROFILE,
  OWNER_PROFILE_FAILED,
  ADD_PARKING_SUCCESS,
  ADD_PARKING_FAILED,
} from "../reducers/ownerReducer";

export const ownerProfile = () => async (dispatch, getState) => {
  try {
    const owner = getState().owner;
    const response = await ownerProfileService();
    console.log(response);
    if (response.status === 200) {
      return dispatch({
        type: OWNER_PROFILE,
        payload: { ...owner, profile: response.data },
      });
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      return dispatch({
        type: OWNER_PROFILE_FAILED,
        payload: {
          error: error.response.data.error,
        },
      });
    }
  }
};

export const addParking = (parkingData) => async (dispatch, getState) => {
  try {
    console.log(parkingData);
    const owner = getState().owner;
    const response = await addParkingService(parkingData);
    console.log(response);
    if (response.status === 201) {
      return dispatch({
        type: ADD_PARKING_SUCCESS,
        payload: { ...owner, profile: response.data },
      });
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      return dispatch({
        type: ADD_PARKING_FAILED,
        payload: error.response.data,
      });
    }
  }
};

export default { ownerProfile, addParking };
