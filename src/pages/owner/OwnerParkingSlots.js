import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// css
import classes from "./OwnerParkingSlots.module.css";

// action
import { fetchParkingBookings } from "../../redux/actions/parkingBookingAction";
import { fetchParkingDetail } from "../../redux/actions/parkingsAction";
import { Box, CircularProgress } from "@mui/material";

const OwnerParkingSlots = ({
  parkingBookings,
  fetchParkingBookings,
  fetchParkingDetail,
}) => {
  const [parking, setParking] = useState({});
  const [loading, setLoading] = useState(true);
  const currentTime = new Date().getTime();
  const Navigate = useNavigate();
  const params = useParams();
  const parkingId = params.parkingId;
  const mountedRef = useRef(true);

  useEffect(() => {
    const apiCall = async () => {
      const parkingData = await fetchParkingDetail(parkingId);
      if (parkingData.type === "PARKING_DETAIL_SUCCESS") {
        if (!mountedRef.current) return null;
        setParking(parkingData.payload);
      }
      const data = await fetchParkingBookings(parkingId);
      if (data.type === "PARKING_BOOKINGS_DATA") {
        if (!mountedRef.current) return null;
        setLoading(false);
      }
    };
    apiCall();
    return () => {
      mountedRef.current = false;
    };
  }, [fetchParkingBookings, fetchParkingDetail, parkingId]);

  const bookings = parkingBookings[parkingId];
  return (
    <>
      <h2
        className={classes.heading}
      >{`Bookings of ${parking.parkingName}`}</h2>
      {loading && (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress />
        </Box>
      )}
      <div className={classes.container}>
        <div>
          {bookings !== undefined &&
            Object.keys(bookings).map((slot) => {
              let btnClass = null;
              const active = bookings[slot].some((booking) => {
                const bookingIn = new Date(booking.inTime).getTime();
                const bookingOut = new Date(booking.outTime).getTime();
                return bookingIn <= currentTime && currentTime <= bookingOut;
              });
              btnClass = active
                ? "ActiveSlotBtn"
                : bookings[slot].length === 0
                ? (btnClass = "NoBookingsSlotBtn")
                : (btnClass = "HasBookingsSlotBtn");

              return (
                <button
                  key={slot}
                  className={classes[btnClass]}
                  onClick={() =>
                    Navigate(`/owner/parkings/${parkingId}/${slot}`)
                  }
                >
                  <h2>{slot}</h2>
                </button>
              );
            })}
          <div>
            <div style={{ display: "flex", marginBottom: 10 }}>
              <div className={classes.activeBooking}></div>
              <span>Active Booking</span>
            </div>
            <div style={{ display: "flex", marginBottom: 10 }}>
              <div className={classes.hasBookings}></div>
              <span>Has Future Bookings</span>
            </div>
            <div style={{ display: "flex", marginBottom: 10 }}>
              <div className={classes.noBookings}></div>
              <span>No Bookings</span>
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
})(OwnerParkingSlots);
