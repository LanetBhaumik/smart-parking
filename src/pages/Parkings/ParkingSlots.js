import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useParams } from "react-router";

// css
import classes from "./ParkingSlots.module.css";

// action
import { fetchParkingDetail } from "../../redux/actions/parkingsAction";
import TimelineModal from "../../components/TimelineModal";

const ParkingSlots = ({ fetchParkingDetail }) => {
  const params = useParams();

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

  return (
    <>
      <h2 className={classes.heading}>Bookings of Parking</h2>
      <div className={classes.container}>
        <div>
          {/* <button><h2>1</h2></button> */}
          {bookings !== undefined &&
            Object.keys(bookings) &&
            Object.keys(bookings).length > 0 &&
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

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  fetchParkingDetail,
})(ParkingSlots);
