import { ownerProfileService } from "../services/ownerService.js";

import { OWNER_PROFILE, OWNER_PROFILE_FAILED } from "../reducers/ownerReducer";

export const ownerProfile = () => async (dispatch, getState) => {
  try {
    const owner = getState().owner;
    const response = await ownerProfileService();
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: OWNER_PROFILE,
        payload: { ...owner, profile: response.data },
      });
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      dispatch({
        type: OWNER_PROFILE_FAILED,
        payload: {
          error: error.response.data.error,
        },
      });
    }
  }
};

export default { ownerProfile };
