import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";

// css
import classes from "./ParkingSlots.module.css";

// action
import { fetchParkingBookings } from "../../redux/actions/parkingBookingAction";
import { fetchParkingDetail } from "../../redux/actions/parkingsAction";

import TimelineModal from "../../components/TimelineModal";

const ParkingSlots = ({
  parkingBookings,
  fetchParkingBookings,
  fetchParkingDetail,
}) => {
  const params = useParams();
  useEffect(() => {
    fetchParkingBookings(params.parkingId);
    fetchParkingDetail(params.parkingId);
  }, []);

  const bookings = parkingBookings[params.parkingId];

  return (
    <>
      <h2 className={classes.heading}>Bookings of Parking</h2>
      <div className={classes.container}>
        <div>
          {bookings !== undefined &&
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
  parkingBookings: state.parkingBookings,
});

export default connect(mapStateToProps, {
  fetchParkingBookings,
  fetchParkingDetail,
})(ParkingSlots);
