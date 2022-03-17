import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { fetchParkingDetail } from "../../redux/actions/parkingsAction";
import classes from "./OwnerParkingSlots.module.css";

const OwnerParkingSlots = ({ fetchParkingDetail }) => {
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
  return (
    <>
      <h2 className={classes.heading}>Bookings of Parking</h2>
      <div className={classes.container}>
        <div>
          {bookings !== undefined &&
            Object.keys(bookings) &&
            Object.keys(bookings).length > 0 &&
            Object.keys(bookings).map((slot) => {
              return (
                <button className={classes.slotBtn}>
                  <Link
                    to={`/owner/parkings/${parkingDetail._id}/${slot}`}
                    className={classes.link}
                  >
                    <h2>{slot}</h2>
                  </Link>
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

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  fetchParkingDetail,
})(OwnerParkingSlots);
