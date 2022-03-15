import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { userProfile } from "../../redux/actions/userAction";

import { Button } from "@material-ui/core";

import classes from "./OwnerProfile.module.css";

const UserProfile = ({ userProfile }) => {
  const Navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    (!token || token === "") && Navigate("/");
  }, [token]);

  const { profile } = useSelector((state) => state.user);

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
            <Button size="small" color="primary">
              Sign Out
            </Button>
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {
  userProfile,
})(UserProfile);
