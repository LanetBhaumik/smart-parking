import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";

import { parkingBookings } from "../../redux/actions/bookingAction";
import { useParams } from "react-router-dom";

// css
import classes from "./ParkingBookings.module.css";

const ParkingBookings = ({ parkingBookings }) => {
  return <></>;
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  parkingBookings,
})(ParkingBookings);
