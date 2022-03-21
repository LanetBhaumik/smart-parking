import React, { useEffect } from "react";
import { connect } from "react-redux";

// actions
import { ownerProfile } from "../../redux/actions/ownerAction";
import { signOut } from "../../redux/actions/authAction";

import { Button } from "@mui/material";

import classes from "./OwnerProfile.module.css";

const OwnerProfile = ({ ownerProfile, signOut, owner }) => {
  const { profile } = owner;

  const onSignOutHandle = () => {
    signOut();
  };

  useEffect(() => {
    ownerProfile();
  }, []);

  return (
    <>
      {Object.keys(profile).length !== 0 && (
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

const mapStateToProps = (state) => ({
  owner: state.owner,
});
export default connect(mapStateToProps, {
  ownerProfile,
  signOut,
})(OwnerProfile);
