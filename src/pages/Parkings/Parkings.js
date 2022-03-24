import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

// action
import { fetchParkings } from "../../redux/actions/parkingsAction";

//components
import ParkingCard from "../../components/ParkingCard";

//material ui
import { Box, CircularProgress, Container, Grid } from "@mui/material";

const Parkings = ({ fetchParkings, parkings }) => {
  const ids = Object.keys(parkings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParkings().then((data) => {
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading && (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress />
        </Box>
      )}
      {parkings.error && <p>No Parkings Found</p>}
      {!loading && !parkings.error && ids && ids.length > 0 && (
        <div>
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
