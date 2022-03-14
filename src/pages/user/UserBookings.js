import React from "react";
import { connect } from "react-redux";

import { userBookings } from "../../redux/actions/userAction";

const UserBookings = () => {
  return <div>UserBookings</div>;
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  userBookings,
})(UserBookings);
