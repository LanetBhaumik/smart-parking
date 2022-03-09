import React, { useEffect } from "react";
import { useSelector, connect } from "react-redux";
import { PARKING_SUCCESS } from "../redux/reducers/parkings";
import { getParkings } from "../redux/services/parkingServices";

const fetchParkings = () => async (dispatch) => {
  const res = await getParkings();
  dispatch({
    type: PARKING_SUCCESS,
    payload: res,
  });
};

const Parkings = ({ fetchParkings, initialState }) => {
  const parkings = useSelector((state) => state.parkings);
  console.log(parkings);

  useEffect(() => {
    fetchParkings();
  }, []);

  return (
    <>
      <div>Parkings</div>
      <p></p>
    </>
  );
};

const mapStateToProps = (state) => ({
  initialState: state.parkings,
});

export default connect(mapStateToProps, {
  fetchParkings,
})(Parkings);
