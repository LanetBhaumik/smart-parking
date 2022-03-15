import { Container, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector, connect } from "react-redux";
import { fetchParkings } from "../../redux/actions/parkingsAction";
import ParkingCard from "../../components/ParkingCard";
import BookingDialog from "../../components/BookingDialog";

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
