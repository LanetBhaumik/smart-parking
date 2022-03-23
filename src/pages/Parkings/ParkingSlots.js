import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";

// css
import classes from "./ParkingSlots.module.css";

// action
import { fetchParkingBookings } from "../../redux/actions/parkingBookingAction";
import { fetchParkingDetail } from "../../redux/actions/parkingsAction";

import TimelineModal from "../../components/TimelineModal";
import { Box, CircularProgress } from "@mui/material";

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
      <div className={classes.container}>
        <div>
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
          <div>
            <div style={{ display: "flex", marginBottom: 10 }}>
              <div className={classes.available}></div>
              <span>Currently Available</span>
            </div>
            <div style={{ display: "flex" }}>
              <div className={classes.occupied}></div>
              <span>Currently Booked</span>
            </div>
          </div>
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
