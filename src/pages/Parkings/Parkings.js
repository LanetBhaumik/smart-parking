import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

// action
import { fetchParkings } from "../../redux/actions/parkingsAction";

//components
import ParkingCard from "../../components/ParkingCard";

//material ui
import { Box, Container, Grid, CircularProgress } from "@mui/material";

const Parkings = ({ fetchParkings }) => {
  const [parkings, setParkings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const mountedRef = useRef(true);

  const fetchMoreData = async () => {
    let data = await fetchParkings(10, page * 10);
    if (data && data.type === "PARKING_SUCCESS") {
      setParkings(parkings.concat(data.payload.parkings));
      setPage(page + 1);
      setTotalResults(data.payload.totalResults);
    }
  };

  useEffect(() => {
    const updateParkings = async () => {
      setLoading(true);
      let data = await fetchParkings(10, 0);
      if (data && data.type === "PARKING_SUCCESS") {
        setParkings(parkings.concat(data.payload.parkings));
        setTotalResults(data.payload.totalResults);
      } else {
      }
      setLoading(false);
    };
    const fetchData = async () => {
      await updateParkings();
    };
    if (!mountedRef.current) return null;
    fetchData();
    return () => {
      mountedRef.current = false;
    };
  }, [fetchParkings, parkings]);

  return (
    <>
      {parkings.error && <p>No Parkings Found</p>}
      {loading && (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress />
        </Box>
      )}
      <InfiniteScroll
        dataLength={parkings.length}
        next={fetchMoreData}
        hasMore={parkings.length !== totalResults}
        loader={
          <Box sx={{ textAlign: "center" }}>
            <h4>Loading.....</h4>
          </Box>
        }
      >
        <Container sx={{ py: 2 }} maxWidth="md">
          <Grid container spacing={4}>
            {parkings.map((parking) => (
              <ParkingCard parking={parking} key={parking._id} />
            ))}
          </Grid>
        </Container>
      </InfiniteScroll>
    </>
  );
};

const mapStateToProps = (state) => ({
  parkings: state.parkings,
});

export default connect(mapStateToProps, {
  fetchParkings,
})(Parkings);
