import * as parkingService from "../../services/parkingServices";
import { PARKING_SUCCESS, PARKING_FAILED } from "../reducers/parkings";

export const getParkings = () => async (dispatch) => {
  try {
    const response = await parkingService.getParkings();
    console.log(response);
    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      dispatch({
        type: PARKING_SUCCESS,
        payload: data,
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

export default { getParkings };
