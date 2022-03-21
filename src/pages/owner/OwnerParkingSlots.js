import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// css
import classes from "./OwnerParkingSlots.module.css";

// action
import { fetchParkingBookings } from "../../redux/actions/parkingBookingAction";
import { fetchParkingDetail } from "../../redux/actions/parkingsAction";

const OwnerParkingSlots = ({
  parkingBookings,
  fetchParkingBookings,
  fetchParkingDetail,
  parkings,
}) => {
  const Navigate = useNavigate();
  const params = useParams();
  console.log(params.parkingId);
  const parkingDetail = parkings[params.parkingId];
  console.log(parkingDetail);

  useEffect(() => {
    fetchParkingBookings(params.parkingId);
    fetchParkingDetail(params.parkingId);
  }, []);

  const bookings = parkingBookings[params.parkingId];
  console.log(bookings);
  return (
    <>
      <h2 className={classes.heading}>Bookings of Parking</h2>
      <div className={classes.container}>
        <div>
          {bookings !== undefined &&
            bookings.length > 0 &&
            bookings.map((booking) => {
              const btnClass =
                booking.bookings.length === 0
                  ? "AvailableSlotBtn"
                  : "OccupiedSlotBtn";
              return (
                <button
                  key={booking._id}
                  className={classes[btnClass]}
                  onClick={() =>
                    Navigate(
                      `/owner/parkings/${params.parkingId}/${booking.slot}`
                    )
                  }
                >
                  <h2>{booking.slot}</h2>
                </button>
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
  parkings: state.parkings,
});

export default connect(mapStateToProps, {
  fetchParkingBookings,
  fetchParkingDetail,
})(OwnerParkingSlots);
