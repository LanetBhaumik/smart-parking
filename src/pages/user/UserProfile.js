import React, { useEffect } from "react";
import { connect } from "react-redux";

// actions
import { userProfile } from "../../redux/actions/userAction";
import { signOut } from "../../redux/actions/authAction";

import { Button } from "@mui/material";

import classes from "./UserProfile.module.css";

const UserProfile = ({ userProfile, signOut, user }) => {
  const { profile } = user;

  const onSignOutHandle = () => {
    signOut();
  };

  useEffect(() => {
    userProfile();
  }, []);

  return (
    <>
      {Object.keys(profile).length === 0 || (
        <>
          <div className={classes.card}>
            <img
              src="/images/profile.jpg"
              alt="Avatar"
              style={{ width: "100%" }}
            />
            <div className={classes.container}>
              <h4>
                <b>{profile.name}</b>
              </h4>
              <p>{`Email: ${profile.email}`}</p>
              <p>{`Mobile No: ${profile.mobile_no}`}</p>
              <p>{`Primary Car : ${profile.car.car_no}`}</p>
              <p>{`Your Cars : `}</p>
              {profile.cars.map((car) => (
                <p key={car.car_no}>{`${car.car_no}`}</p>
              ))}
            </div>
            <Button size="small" color="primary" onClick={onSignOutHandle}>
              Sign Out
            </Button>
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, {
  userProfile,
  signOut,
})(UserProfile);
