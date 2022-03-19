import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";

// css
import classes from "./ParkingSlots.module.css";

// action
import { fetchParkingBookings } from "../../redux/actions/parkingBookingAction";

import TimelineModal from "../../components/TimelineModal";

const ParkingSlots = ({ parkingBooking, fetchParkingBookings }) => {
  const params = useParams();
  useEffect(() => {
    fetchParkingBookings(params.parkingId);
  }, []);

  const bookings = parkingBooking[params.parkingId];
  console.log(bookings);

  return (
    <>
      <h2 className={classes.heading}>Bookings of Parking</h2>
      <div className={classes.container}>
        <div>
          {bookings !== undefined &&
            bookings.length > 0 &&
            bookings.map((booking) => {
              return (
                <TimelineModal
                  key={booking._id}
                  slot={booking.slot}
                  bookings={booking.bookings}
                />
              );
            })}
          <div>
            <div style={{ display: "flex", marginBottom: 10 }}>
              <div className={classes.available}></div>
              <span>Available</span>
            </div>
            <div style={{ display: "flex" }}>
              <div className={classes.occupied}></div>
              <span>Occupied</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  parkingBooking: state.parkingBooking,
});

export default connect(mapStateToProps, {
  fetchParkingBookings,
})(ParkingSlots);
