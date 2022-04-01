import {
  userProfileService,
  userBookingsService,
  addCarService,
  deleteCarService,
  primaryCarService,
} from "../services/userService.js";
import {
  USER_PROFILE,
  USER_BOOKINGS,
  USER_BOOKINGS_FAILED,
  USER_PROFILE_FAILED,
  ADD_CAR,
  ADD_CAR_SUCCESS,
  ADD_CAR_ERROR,
  DELETE_CAR,
  DELETE_CAR_SUCCESS,
  DELETE_CAR_ERROR,
  PRIMARY_CAR,
  PRIMARY_CAR_SUCCESS,
  PRIMARY_CAR_ERROR,
} from "../reducers/userReducer";

export const userProfile = () => async (dispatch) => {
  try {
    const response = await userProfileService();
    if (response.status === 200) {
      return dispatch({
        type: USER_PROFILE,
        payload: response.data,
      });
    }
  } catch (error) {
    if (error.response) {
      return dispatch({
        type: USER_PROFILE_FAILED,
        payload: {
          error: error.response.data.error,
        },
      });
    }
  }
};

export const userBookings = (limit, skip) => async (dispatch) => {
  try {
    const response = await userBookingsService(limit, skip);
    if (response.status < 350) {
      return dispatch({
        type: USER_BOOKINGS,
        payload: {
          bookings: response.data.bookings,
          totalResults: response.data.totalResults,
        },
      });
    }
  } catch (error) {
    if (error.response) {
      return dispatch({
        type: USER_BOOKINGS_FAILED,
        payload: {
          error: error.response.data.error,
        },
      });
    }
  }
};

export const addCar = (car) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_CAR,
    });
    const response = await addCarService(car);
    if (response.status < 350) {
      return dispatch({
        type: ADD_CAR_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    if (error.response) {
      return dispatch({
        type: ADD_CAR_ERROR,
        payload: {
          error: error.response.data.error,
        },
      });
    }
  }
};

export const deleteCar = (carId) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_CAR,
    });
    const response = await deleteCarService(carId);
    if (response.status < 350) {
      return dispatch({
        type: DELETE_CAR_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    if (error.response) {
      return dispatch({
        type: DELETE_CAR_ERROR,
        payload: {
          error: error.response.data.error,
        },
      });
    }
  }
};

export const makeCarPrimary = (carId) => async (dispatch) => {
  try {
    dispatch({
      type: PRIMARY_CAR,
    });
    const response = await primaryCarService(carId);
    if (response.status < 350) {
      return dispatch({
        type: PRIMARY_CAR_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    if (error.response) {
      return dispatch({
        type: PRIMARY_CAR_ERROR,
        payload: {
          error: error.response.data.error,
        },
      });
    }
  }
};

export default {
  userProfile,
  userBookings,
  addCar,
  deleteCar,
  makeCarPrimary,
};
