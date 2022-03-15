import React, { useEffect } from "react";
import { useSelector, connect } from "react-redux";

// action
import { fetchParkings } from "../../redux/actions/parkingsAction";

//components
import ParkingCard from "../../components/ParkingCard";
import BookingDialog from "../../components/BookingDialog";

//material ui
import { Container, Grid } from "@material-ui/core";

const Parkings = ({ fetchParkings }) => {
  const parkings = useSelector((state) => state.parkings);
  console.log(parkings);

  useEffect(() => {
    fetchParkings();
  }, []);

  return (
    <>
      <BookingDialog />

      {!parkings.length && <p>No Parkings Found</p>}
      {parkings.length && (
        <Container sx={{ py: 8, mt: 100 }} maxWidth="md">
          <Grid container spacing={4}>
            {parkings.map((parking) => (
              <ParkingCard parking={parking} key={parking._id} />
            ))}
          </Grid>
        </Container>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  fetchParkings,
})(Parkings);
