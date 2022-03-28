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
    if (response.status === 200) {
      return dispatch({
        type: PARKING_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    if (error.response) {
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
    if (response.status === 200) {
      return dispatch({
        type: PARKING_DETAIL_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    if (error.response) {
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
