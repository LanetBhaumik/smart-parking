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
        data: data,
      });
    }
  } catch (error) {
    if (error.response) {
      dispatch({
        type: PARKING_FAILED,
        data: {
          error_msg: error.response.data.error,
        },
      });
    }
  }
};

export default { getParking };
