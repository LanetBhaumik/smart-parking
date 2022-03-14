import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { userProfile } from "../../redux/actions/userAction";

import { Button } from "@material-ui/core";

import classes from "./UserProfile.module.css";

const UserProfile = ({ userProfile }) => {
  const Navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    (!token || token === "") && Navigate("/");
  }, [token]);

  const { user } = useSelector((state) => state.auth);
  if (!user) {
    userProfile();
  }
  return (
    <>
      {user && (
        <>
          <br />
          <div className={classes.card}>
            <img
              src="/images/profile.jpg"
              alt="Avatar"
              style={{ width: "100%" }}
            />
            <div className={classes.container}>
              <h4>
                <b>{user.name}</b>
              </h4>
              <p>{`Architect & Engineer`}</p>
              <p>{`Email: ${user.email}`}</p>
              <p>{`Mobile No: ${user.mobile_no}`}</p>
              <p>{`Primary Car : ${user.car.car_no}`}</p>
              <p>{`Your Cars : `}</p>
              {user.cars.map((car) => (
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
