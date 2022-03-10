import React, { useEffect } from "react";
import { useSelector, connect } from "react-redux";
import { fetchParkings } from "../../redux/actions/parkings";
import ParkingCard from "./ParkingCard";

// const fetchParkings = () => async (dispatch) => {
//   const res = await getParkings();
//   dispatch({
//     type: PARKING_SUCCESS,
//     payload: res.data,
//   });
// };

const Parkings = ({ fetchParkings }) => {
  const parkings = useSelector((state) => state.parkings);

  useEffect(() => {
    fetchParkings();
  }, []);

  return (
    <>
      {parkings.map((parking) => {
        return <ParkingCard parking={parking} key={parking._id} />;
      })}
    </>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  fetchParkings,
})(Parkings);
