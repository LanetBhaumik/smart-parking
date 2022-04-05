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

// optimization of bookings array
const getOptimizedBookings = (bkgs) => {
  if (bkgs.length === 0) return [];
  const optimizedBookingsArr = [];
  const lastIndex = bkgs.length - 1;
  for (let i = 0; i < lastIndex; i++) {
    const newIn = bkgs[i].in_time;
    while (i < lastIndex && bkgs[i].out_time === bkgs[i + 1].in_time) {
      i++;
    }
    const newOut = bkgs[i].out_time;
    optimizedBookingsArr.push({
      color: "error",
      in_time: newIn,
      out_time: newOut,
    });
  }
  if (optimizedBookingsArr.length === 0) {
    optimizedBookingsArr.push({
      color: "error",
      in_time: bkgs.at(-1).in_time,
      out_time: bkgs.at(-1).out_time,
    });
  }
  if (
    // optimizedBookingsArr.length > 0 &&
    optimizedBookingsArr.at(-1).out_time !== bkgs.at(-1).out_time
  ) {
    optimizedBookingsArr.push({
      color: "error",
      in_time: bkgs[lastIndex].in_time,
      out_time: bkgs[lastIndex].out_time,
    });
  }
  return optimizedBookingsArr;
};

const ParkingSlots = ({
  parkingBookings,
  fetchParkingBookings,
  fetchParkingDetail,
}) => {
  const [parking, setParking] = useState({});
  const [loading, setLoading] = useState(true);
  const [showTimeline, setShowTimeline] = useState({});
  const params = useParams();
  const parkingId = params.parkingId;

  useEffect(() => {
    const optimizedBookings = {};
    const fetchData = async () => {
      const parkingData = await fetchParkingDetail(parkingId);
      if (parkingData.type === "PARKING_DETAIL_SUCCESS") {
        setParking(parkingData.payload);
      }

      const data = await fetchParkingBookings(parkingId);
      if (data.type === "PARKING_BOOKINGS_DATA") {
        const bookingList = data.payload[parkingId];
        Object.keys(bookingList).forEach((slot) => {
          optimizedBookings[slot] = getOptimizedBookings(bookingList[slot]);
        });
        setShowTimeline(optimizedBookings);
        setLoading(false);
      }
    };
    fetchData();
  }, [fetchParkingBookings, fetchParkingDetail, parkingId]);

  return (
    <>
      <h2 className={classes.heading}>Parking Slots Availability</h2>
      {loading && (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress />
        </Box>
      )}
      <div>
        <div className={classes.container}>
          {!loading &&
            // optimizedBookings &&
            Object.keys(showTimeline).map((slot) => {
              return (
                <TimelineModal
                  key={slot}
                  slot={slot}
                  bookings={showTimeline[slot]}
                  parking={parking}
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
