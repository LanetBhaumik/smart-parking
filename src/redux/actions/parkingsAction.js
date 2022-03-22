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

export const fetchParkings = () => async (dispatch) => {
  try {
    const response = await getParkingsService();
    console.log(response.data);

    const payload = {};
    response.data.forEach((parking, i) => {
      payload[parking._id] = response.data[i];
    });
    if (response.status === 200) {
      return dispatch({
        type: PARKING_SUCCESS,
        payload,
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
