import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

// actions
import { ownerProfile } from "../../redux/actions/ownerAction";
import { signOut } from "../../redux/actions/authAction";

import { Box, Button } from "@mui/material";

import classes from "./OwnerProfile.module.css";

const OwnerProfile = ({ ownerProfile, signOut }) => {
  const [profile, setProfile] = useState({});
  const mountedRef = useRef(true);

  const onSignOutHandle = () => {
    signOut();
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await ownerProfile();
      if (data.type === "OWNER_PROFILE") {
        if (!mountedRef.current) return null;
        setProfile(data.payload.profile);
      }
    };

    fetchProfile();

    return () => {
      mountedRef.current = false;
    };
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
            <Box sx={{ textAlign: "center", p: 1 }}>
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
  owner: state.owner,
});
export default connect(mapStateToProps, {
  ownerProfile,
  signOut,
})(OwnerProfile);
