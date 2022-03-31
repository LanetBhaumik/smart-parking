import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

// css
import classes from "./SlotBookings.module.css";

// action
import {
  fetchParkingBookings,
  fetchParkingSlotBookings,
} from "../redux/actions/parkingBookingAction";
import { fetchParkingDetail } from "../redux/actions/parkingsAction";
import { Box, CircularProgress } from "@mui/material";

const SlotBookings = ({
  parkingBookings,
  fetchParkingBookings,
  fetchParkingSlotBookings,
  fetchParkingDetail,
}) => {
  const currentTime = new Date();
  const params = useParams();
  const parkingId = params.parkingId;
  const slot = params.slot;
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetchParkingBookings(parkingId);
      await fetchParkingDetail(parkingId);
      const data = await fetchParkingSlotBookings(parkingId, slot);
      if (data.type === "SLOT_BOOKINGS_DATA") {
        if (!mountedRef.current) return null;
        setLoading(false);
      }
    };
    fetchData();
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const parking = parkingBookings[parkingId];
  let bookings = [];
  if (parking) {
    bookings = parking[slot];
  }

  const pad = (n) => (n < 10 ? "0" + n : n);
  const timeFormat = (date) => {
    date = new Date(date);
    const dd = pad(date.getDate());
    const mm = pad(date.getMonth() + 1);
    const yyyy = date.getFullYear();
    let hh = date.getHours();
    const min = pad(date.getMinutes());

    const ampm = hh >= 12 ? "PM" : "AM";
    hh = hh % 12;
    hh = hh ? hh : 12; // the hour '0' should be '12'
    hh = pad(hh);
    return `${dd}/${mm}/${yyyy} ${hh}:${min} ${ampm}`;
  };
  return (
    <>
      <h2 className={classes.heading}>Bookings of slot {slot} </h2>
      <div className={classes.container}>
        <ul className={classes["responsive-table"]}>
          <li className={classes["table-header"]}>
            <div className={`${classes.col} ${classes["col-1"]}`}>Status</div>
            <div className={`${classes.col} ${classes["col-1"]}`}>User</div>
            <div className={`${classes.col} ${classes["col-1"]}`}>Car</div>
            <div className={`${classes.col} ${classes["col-1"]}`}>
              Entry Time
            </div>
            <div className={`${classes.col} ${classes["col-1"]}`}>
              Exit Time
            </div>
            <div className={`${classes.col} ${classes["col-1"]}`}>Charge</div>
          </li>
          {loading && (
            <Box sx={{ textAlign: "center" }}>
              <CircularProgress />
            </Box>
          )}
          {!loading && bookings.length === 0 && (
            <h3 className={classes.heading}>No Bookings</h3>
          )}
          {!loading &&
            bookings.length > 0 &&
            bookings.map((booking, i) => {
              return (
                <li className={classes["table-row"]} key={i}>
                  {currentTime > new Date(booking.out_time) && (
                    <div
                      className={`${classes.col} ${classes["col-1"]}`}
                      data-label="Status"
                    >
                      <span className={classes.expired}>Expired</span>
                    </div>
                  )}

                  {currentTime < new Date(booking.in_time) && (
                    <div
                      className={`${classes.col} ${classes["col-1"]}`}
                      data-label="Status"
                    >
                      <span className={classes.upcoming}>Upcoming</span>
                    </div>
                  )}
                  {currentTime >= new Date(booking.in_time) &&
                    currentTime <= new Date(booking.out_time) && (
                      <div
                        className={`${classes.col} ${classes["col-1"]}`}
                        data-label="Status"
                      >
                        <span className={classes.active}>Active</span>
                      </div>
                    )}
                  <div
                    className={`${classes.col} ${classes["col-1"]}`}
                    data-label="User"
                  >
                    {booking.user.name}
                  </div>
                  <div
                    className={`${classes.col} ${classes["col-1"]}`}
                    data-label="Car"
                  >
                    {booking.car.car_no}
                  </div>
                  <div
                    className={`${classes.col} ${classes["col-1"]}`}
                    data-label="Entry Time"
                  >
                    {timeFormat(booking.in_time)}
                  </div>
                  <div
                    className={`${classes.col} ${classes["col-1"]}`}
                    data-label="Exit Time"
                  >
                    {timeFormat(booking.out_time)}
                  </div>
                  <div
                    className={`${classes.col} ${classes["col-1"]}`}
                    data-label="Charge"
                  >
                    {`${booking.charge} Rs.`}
                  </div>
                </li>
              );
            })}
        </ul>
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
  fetchParkingSlotBookings,
})(SlotBookings);
