import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchParkingDetail } from "../redux/actions/parkingsAction";

// css
import classes from "./SlotBookings.module.css";

const SlotBookings = ({ fetchParkingDetail }) => {
  const currentDate = new Date();
  const params = useParams();
  console.log(params.parkingId);
  const parkingDetail = useSelector((state) => state.parking[params.parkingId]);
  console.log(parkingDetail);
  let bookings = {};
  if (parkingDetail) {
    bookings = parkingDetail.bookings;
  }
  console.log(bookings);
  useEffect(() => {
    fetchParkingDetail(params.parkingId);
  }, []);

  const pad = (n) => (n < 10 ? "0" + n : n);
  const timeFormat = (date) => {
    date = new Date(date);
    const dd = pad(date.getDate());
    const mm = pad(date.getMonth());
    const yyyy = date.getFullYear();
    const hh = pad(date.getHours());
    const min = pad(date.getMinutes());
    return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
  };
  return (
    <>
      <h2 className={classes.heading}>bookings of slot</h2>
      <div className={classes.container}>
        <ul className={classes["responsive-table"]}>
          <li className={classes["table-header"]}>
            <div className={`${classes.col} ${classes["col-1"]}`}>Status</div>
            <div className={`${classes.col} ${classes["col-1"]}`}>Car No</div>
            <div className={`${classes.col} ${classes["col-1"]}`}>User</div>
            <div className={`${classes.col} ${classes["col-1"]}`}>
              Entry Time
            </div>
            <div className={`${classes.col} ${classes["col-1"]}`}>
              Exit Time
            </div>
            <div className={`${classes.col} ${classes["col-1"]}`}>Charge</div>
          </li>

          {bookings &&
            bookings.length > 0 &&
            bookings.map((booking, i) => {
              console.log(booking);
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
                    {/* {booking.car.car_no} */}
                  </div>
                  <div
                    className={`${classes.col} ${classes["col-1"]}`}
                    data-label="User"
                  >
                    {/* {booking.user.name} */}
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

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  fetchParkingDetail,
})(SlotBookings);
