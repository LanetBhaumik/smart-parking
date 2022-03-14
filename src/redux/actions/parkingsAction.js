import { getParkings } from "../services/parkingService";
import { PARKING_SUCCESS, PARKING_FAILED } from "../reducers/parkingReducer";

export const fetchParkings = () => async (dispatch) => {
  try {
    const response = await getParkings();
    console.log(response.data);
    if (response.status === 200) {
      dispatch({
        type: PARKING_SUCCESS,
        payload: response.data,
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

export default { fetchParkings };
