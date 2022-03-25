import React, { useEffect } from "react";
import { connect } from "react-redux";

// actions
import { userProfile } from "../../redux/actions/userAction";
import { signOut } from "../../redux/actions/authAction";

import { Box, Button } from "@mui/material";

import classes from "./UserProfile.module.css";

const UserProfile = ({ userProfile, signOut, profile }) => {
  const onSignOutHandle = () => {
    signOut();
  };

  const carNoFormat = (carNo) => {
    return `${carNo.slice(0, 2)} ${carNo.slice(2, 4)} ${carNo.slice(
      4,
      6
    )} ${carNo.slice(6)}`;
  };
  useEffect(() => {
    userProfile();
  }, []);

  return (
    <>
      {profile && Object.keys(profile).length > 0 && (
        <>
          <div className={classes.card}>
            <img
              src="/images/profile.jpg"
              alt="Avatar"
              style={{ width: "100%" }}
            />
            <div className={classes.container}>
              <p>
                <b>Name : </b>
                {profile.name}
              </p>
              <p>
                <b>Email : </b>
                {profile.email}
              </p>
              <p>
                <b>Mobile No : </b>
                {profile.mobile_no}
              </p>
              <p>
                <b>Primary Car : </b>
                {carNoFormat(profile.car.car_no)}
              </p>
              <p>
                <b>Your Cars : </b>
              </p>
              {profile.cars.map((car) => (
                <p key={car.car_no}>{carNoFormat(car.car_no)}</p>
              ))}
              {/* <Button
                size="small"
                variant="outlined"
                color="primary"
                onClick={onSignOutHandle}
              >
                Add Car
              </Button> */}
            </div>
            <Box sx={{ textAlign: "center" }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={onSignOutHandle}
              >
                Sign Out
              </Button>
            </Box>
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.user.profile,
});
export default connect(mapStateToProps, {
  userProfile,
  signOut,
})(UserProfile);
