import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

// css
import classes from "./UserBookings.module.css";

// material ui
import { Box, CircularProgress, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// action
import { setAlert } from "../../redux/actions/alertAction";
import {
  deleteBookingAction,
  userBookings,
} from "../../redux/actions/userAction";

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

const currentTime = new Date();
const getBookingStatus = (inTime, outTime) => {
  if (currentTime > new Date(outTime)) {
    return "expired";
  } else if (currentTime < new Date(inTime)) {
    return "upcoming";
  } else {
    return "active";
  }
};

const UserBookings = ({ userBookings, deleteBookingAction, setAlert }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  const mountedRef = useRef(true);

  const fetchMoreData = async () => {
    let data = await userBookings(10, skip);
    if (data && data.type === "USER_BOOKINGS_SUCCESS") {
      setBookings(bookings.concat(data.payload.bookings));
      setSkip(skip + 10);
      setTotalResults(data.payload.totalResults);
    }
  };

  useEffect(() => {
    const updateBookings = async () => {
      setLoading(true);
      let data = await userBookings(10, skip);
      if (data && data.type === "USER_BOOKINGS_SUCCESS") {
        setBookings(bookings.concat(data.payload.bookings));
        setTotalResults(data.payload.totalResults);
      }
      setSkip(skip + 10);
      setLoading(false);
    };
    if (!mountedRef.current) return null;
    updateBookings();
    return () => {
      mountedRef.current = false;
    };
  }, [bookings, skip, userBookings]);

  const onDeleteBooking = async (bookingId) => {
    if (!loading) {
      setLoading(true);
      const data = await deleteBookingAction(bookingId);
      if (data.type === "DELETE_BOOKING_SUCCESS") {
        setBookings(
          bookings.filter((bkng) => {
            return bkng._id !== bookingId;
          })
        );
        setSkip(skip - 1);
        setAlert("success", "booking deleted successfully");
      } else {
        setAlert("error", data.payload.error);
      }
      setLoading(false);
    }
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
            <div className={`${classes.col} ${classes["col-1"]}`}>Action</div>
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
            hasMore={bookings.length < totalResults}
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
                const bookingStatus = getBookingStatus(
                  booking.inTime,
                  booking.outTime
                );

                return (
                  <li className={classes["table-row"]} key={i}>
                    <div
                      className={`${classes.col} ${classes["col-1"]}`}
                      data-label="Status"
                    >
                      <span className={classes[bookingStatus]}>
                        {bookingStatus}
                      </span>
                    </div>
                    <div
                      className={`${classes.col} ${classes["col-1"]}`}
                      data-label="Car No"
                    >
                      {booking?.car.carNo}
                    </div>
                    <div
                      className={`${classes.col} ${classes["col-1"]}`}
                      data-label="Parking"
                    >
                      {booking.parking.parkingName}
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
                      {timeFormat(booking.inTime)}
                    </div>
                    <div
                      className={`${classes.col} ${classes["col-1"]}`}
                      data-label="Exit Time"
                    >
                      {timeFormat(booking.outTime)}
                    </div>
                    <div
                      className={`${classes.col} ${classes["col-1"]}`}
                      data-label="Charge"
                    >
                      {`${booking.charge} Rs.`}
                    </div>
                    <div
                      className={`${classes.col} ${classes["col-1"]}`}
                      data-label="Action"
                    >
                      <IconButton
                        title="Delete Booking"
                        variant="outlined"
                        onClick={() => onDeleteBooking(booking._id)}
                        style={{ color: "red" }}
                      >
                        <DeleteIcon />
                      </IconButton>
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
  setAlert,
  deleteBookingAction,
})(UserBookings);
