import React, { useEffect } from "react";
import { useSelector, connect } from "react-redux";

// action
import { fetchParkings } from "../../redux/actions/parkingsAction";

//components
import ParkingCard from "../../components/ParkingCard";

//material ui
import { Container, Grid } from "@material-ui/core";

const Parkings = ({ fetchParkings }) => {
  const { list } = useSelector((state) => state.parking);
  console.log(list);

  useEffect(() => {
    fetchParkings();
  }, []);

  return (
    <>
      {!list && <p>No Parkings Found</p>}
      {list && list.length > 0 && (
        <div style={{ marginTop: "5vh" }}>
          <Container sx={{ py: 8, mt: 100 }} maxWidth="md">
            <Grid container spacing={4}>
              {list.map((parking) => (
                <ParkingCard parking={parking} key={parking._id} />
              ))}
            </Grid>
          </Container>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  fetchParkings,
})(Parkings);
