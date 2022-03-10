import { getParkings } from "../services/parkingServices";
import { PARKING_SUCCESS, PARKING_FAILED } from "../reducers/parkings";

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
      dispatch({
        type: PARKING_FAILED,
        payload: {
          error_msg: error.response.data.error,
        },
      });
    }
  }
};

export default { fetchParkings };
