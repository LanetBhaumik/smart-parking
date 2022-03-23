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
  const currentTime = new Date().getTime();
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
  return (
    <>
      <h2 className={classes.heading}>Bookings of Parking</h2>
      <div className={classes.container}>
        <div>
          {bookings !== undefined &&
            Object.keys(bookings).map((slot) => {
              const active = bookings[slot].some((booking) => {
                const bookingIn = new Date(booking.in_time).getTime();
                const bookingOut = new Date(booking.out_time).getTime();
                return bookingIn <= currentTime && currentTime <= bookingOut;
              });
              const btnClass = active ? "OccupiedSlotBtn" : "AvailableSlotBtn";

              return (
                <button
                  key={slot}
                  className={classes[btnClass]}
                  onClick={() =>
                    Navigate(`/owner/parkings/${params.parkingId}/${slot}`)
                  }
                >
                  <h2>{slot}</h2>
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
