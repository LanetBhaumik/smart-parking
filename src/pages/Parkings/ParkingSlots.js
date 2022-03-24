import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";

// css
import classes from "./ParkingSlots.module.css";

// action
import { fetchParkingBookings } from "../../redux/actions/parkingBookingAction";
import { fetchParkingDetail } from "../../redux/actions/parkingsAction";

import TimelineModal from "../../components/TimelineModal";

// material ui
import { Box, CircularProgress, Typography } from "@mui/material";
import { TimelineDot } from "@mui/lab";

const ParkingSlots = ({
  parkingBookings,
  fetchParkingBookings,
  fetchParkingDetail,
}) => {
  const [loading, setLoading] = useState(true);
  const params = useParams();
  useEffect(() => {
    fetchParkingDetail(params.parkingId);
    fetchParkingBookings(params.parkingId).then((data) => {
      if (data.type === "PARKING_BOOKINGS_DATA") setLoading(false);
    });
  }, []);

  const bookings = parkingBookings[params.parkingId];

  return (
    <>
      <h2 className={classes.heading}>Bookings of Parking</h2>
      {loading && (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress />
        </Box>
      )}
      <div>
        <div className={classes.container}>
          {!loading &&
            bookings !== undefined &&
            Object.keys(bookings).map((slot) => {
              return (
                <TimelineModal
                  key={slot}
                  slot={slot}
                  bookings={bookings[slot]}
                />
              );
            })}
          <Box
            textAlign="center"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Box
              sx={{
                display: "flex",
              }}
            >
              <TimelineDot color="success" />
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  m: 1,
                }}
              >
                Currently Available
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
              }}
            >
              <TimelineDot color="error" />
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  m: 1,
                }}
              >
                Currently Booked
              </Typography>
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  parkingBookings: state.parkingBookings,
});

export default connect(mapStateToProps, {
  fetchParkingBookings,
  fetchParkingDetail,
})(ParkingSlots);
