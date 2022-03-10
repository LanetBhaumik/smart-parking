import { Container, Grid } from "@material-ui/core";
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
      <Container sx={{ py: 8, mt: 100 }} maxWidth="md">
        <Grid container spacing={4}>
          {parkings.map((parking) => (
            <ParkingCard parking={parking} key={parking._id} />
          ))}
        </Grid>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  fetchParkings,
})(Parkings);
