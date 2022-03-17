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

export const fetchParkings = () => async (dispatch, getState) => {
  try {
    const parking = getState().parking;
    const response = await getParkingsService();
    console.log(response.data);
    if (response.status === 200) {
      dispatch({
        type: PARKING_SUCCESS,
        payload: {
          ...parking,
          list: response.data,
        },
      });
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      dispatch({
        type: PARKING_FAILED,
        payload: {
          error: error.response.data.error,
        },
      });
    }
  }
};

export const fetchParkingDetail = (parkingId) => async (dispatch, getState) => {
  try {
    const parking = getState().parking;
    const response = await parkingDetailService(parkingId);
    console.log(response.data);
    if (response.status === 200) {
      dispatch({
        type: PARKING_DETAIL_SUCCESS,
        payload: {
          ...parking,
          [parkingId]: response.data,
        },
      });
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      dispatch({
        type: PARKING_DETAIL_FAILED,
        payload: {
          error: error.response.data.error,
        },
      });
    }
  }
};

export default { fetchParkings, fetchParkingDetail };
