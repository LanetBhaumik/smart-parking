import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";

import { userBookings } from "../../redux/actions/userAction";

// css
import classes from "./UserBookings.module.css";

const UserBookings = ({ userBookings }) => {
  const currentDate = new Date();

  const { bookings } = useSelector((state) => state.user);
  useEffect(() => {
    userBookings();
  }, []);

  const timeFormat = (date) => {
    date = new Date(date);
    const dd = date.getDate();
    const mm = date.getMonth();
    const yyyy = date.getFullYear();
    const hh = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    return `${dd}/${mm}/${yyyy} ${hh}:${min}:${sec}`;
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
            <div className={`${classes.col} ${classes["col-1"]}`}>
              Entry Time
            </div>
            <div className={`${classes.col} ${classes["col-1"]}`}>
              Exit Time
            </div>
            <div className={`${classes.col} ${classes["col-1"]}`}>Charge</div>
          </li>

          {bookings &&
            bookings.map((booking, i) => {
              return (
                <li className={classes["table-row"]} key={i}>
                  {currentDate > new Date(booking.out_time) && (
                    <div
                      className={`${classes.col} ${classes["col-1"]}`}
                      data-label="Status"
                    >
                      <span className={classes.expired}>Expired</span>
                    </div>
                  )}

                  {currentDate <= new Date(booking.out_time) && (
                    <div
                      className={`${classes.col} ${classes["col-1"]}`}
                      data-label="Status"
                    ></div>
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

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  userBookings,
})(UserBookings);
