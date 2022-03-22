import React, { useEffect } from "react";
import { connect } from "react-redux";

// action
import { fetchParkings } from "../../redux/actions/parkingsAction";

//components
import ParkingCard from "../../components/ParkingCard";

//material ui
import { Container, Grid } from "@mui/material";

const Parkings = ({ fetchParkings, parkings }) => {
  const ids = Object.keys(parkings);
  console.log(ids);

  useEffect(() => {
    fetchParkings();
  }, []);

  return (
    <>
      {parkings.error && <p>No Parkings Found</p>}
      {!parkings.error && ids && ids.length > 0 && (
        <div style={{ marginTop: "5vh" }}>
          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
              {ids.map((id) => (
                <ParkingCard parking={parkings[id]} key={id} />
              ))}
            </Grid>
          </Container>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  parkings: state.parkings,
});

export default connect(mapStateToProps, {
  fetchParkings,
})(Parkings);
