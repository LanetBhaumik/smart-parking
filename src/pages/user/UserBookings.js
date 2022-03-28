import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import { userBookings } from "../../redux/actions/userAction";

// css
import classes from "./UserBookings.module.css";

import { Box, CircularProgress } from "@mui/material";

const UserBookings = ({ userBookings }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const currentTime = new Date();

  const updateBookings = async () => {
    setLoading(true);
    let data = await userBookings(10, 0);
    if (data && data.type === "USER_BOOKINGS") {
      setBookings(bookings.concat(data.payload.bookings));
      setTotalResults(data.payload.totalResults);
    }
    setLoading(false);
  };

  const fetchMoreData = async () => {
    let data = await userBookings(10, page * 10);
    if (data && data.type === "USER_BOOKINGS") {
      setBookings(bookings.concat(data.payload.bookings));
      setPage(page + 1);
      setTotalResults(data.payload.totalResults);
    }
  };

  useEffect(() => {
    updateBookings();
  }, []);

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
  const carNoFormat = (carNo) => {
    return `${carNo.slice(0, 2)} ${carNo.slice(2, 4)} ${carNo.slice(
      4,
      6
    )} ${carNo.slice(6)}`;
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

          <InfiniteScroll
            dataLength={bookings.length}
            next={fetchMoreData}
            hasMore={bookings.length !== totalResults}
            loader={
              <Box sx={{ textAlign: "center" }}>
                <h4>Loading.....</h4>
              </Box>
            }
          >
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
                      {carNoFormat(booking.car.car_no)}
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
          </InfiniteScroll>
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
