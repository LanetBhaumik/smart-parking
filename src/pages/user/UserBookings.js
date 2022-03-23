import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { userBookings } from "../../redux/actions/userAction";

// css
import classes from "./UserBookings.module.css";

const UserBookings = ({ userBookings, user }) => {
  const [loading, setLoading] = useState(true);
  const currentTime = new Date();

  const { bookings } = user;
  useEffect(() => {
    userBookings().then((data) => {
      if (data.type === "USER_BOOKINGS") setLoading(false);
    });
  }, []);

  const pad = (n) => (n < 10 ? "0" + n : n);
  const timeFormat = (date) => {
    date = new Date(date);
    const dd = pad(date.getDate());
    const mm = pad(date.getMonth() + 1);
    const yyyy = date.getFullYear();
    const hh = pad(date.getHours());
    const min = pad(date.getMinutes());
    return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
  };
  return (
    <>
      <h2 className={classes.heading}>Your Bookings</h2>
      <div className={classes.container}>
        <ul className={classes["responsive-table"]}>
          <li className={classes["table-header"]}>
            <div className={`${classes.col} ${classes["col-1"]}`}>Status</div>
            <div className={`${classes.col} ${classes["col-1"]}`}>Car No</div>
            <div className={`${classes.col} ${classes["col-1"]}`}>Parking</div>
            <div className={`${classes.col} ${classes["col-1"]}`}>Slot</div>
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
            bookings &&
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
                    data-label="Car No"
                  >
                    {booking.car.car_no}
                  </div>
                  <div
                    className={`${classes.col} ${classes["col-1"]}`}
                    data-label="Parking"
                  >
                    {booking.parking.parking_name}
                  </div>
                  <div
                    className={`${classes.col} ${classes["col-1"]}`}
                    data-label="Slot"
                  >
                    {booking.slot}
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
      <div className={classes.note}>
        <div>
          * There is no need to print anything out! All your bookings are here.
        </div>
        <div>
          * Parking lots are equipped with Automatic License Plate Recognition.
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  userBookings,
})(UserBookings);
