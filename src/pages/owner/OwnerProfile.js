import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router";

// actions
import { ownerProfile } from "../../redux/actions/ownerAction";
import { signOut } from "../../redux/actions/authAction";

import { Button } from "@material-ui/core";

import classes from "./OwnerProfile.module.css";

const OwnerProfile = ({ ownerProfile, signOut }) => {
  const Navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    (!token || token === "") && Navigate("/");
  }, [token]);

  const { profile } = useSelector((state) => state.owner);

  const onSignOutHandle = () => {
    signOut();
  };

  useEffect(() => {
    ownerProfile();
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
              <p>{`Your Parkings : `}</p>
              {profile.parkings.map((parking) => (
                <p key={parking._id}>{`${parking.parking_name}`}</p>
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

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {
  ownerProfile,
  signOut,
})(OwnerProfile);
