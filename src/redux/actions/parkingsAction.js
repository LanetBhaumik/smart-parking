import {
  getParkingsService,
  parkingDetailService,
} from "../services/parkingService";
import {
  PARKING_SUCCESS,
  PARKING_FAILED,
  PARKING_DETAIL_SUCCESS,
  PARKING_DETAIL_FAILED,
} from "../reducers/parkingReducer";

export const fetchParkings = (limit, skip) => async (dispatch) => {
  try {
    const response = await getParkingsService(limit, skip);
    console.log(response.data);
    if (response.status === 200) {
      return dispatch({
        type: PARKING_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      return dispatch({
        type: PARKING_FAILED,
        payload: {
          error: error.response.data.error,
        },
      });
    }
  }
};

export const fetchParkingDetail = (parkingId) => async (dispatch) => {
  try {
    const response = await parkingDetailService(parkingId);
    console.log(response.data);
    if (response.status === 200) {
      return dispatch({
        type: PARKING_DETAIL_SUCCESS,
        payload: {
          [parkingId]: response.data,
        },
      });
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      return dispatch({
        type: PARKING_DETAIL_FAILED,
        payload: {
          error: error.response.data.error,
        },
      });
    }
  }
};

export default { fetchParkings, fetchParkingDetail };
