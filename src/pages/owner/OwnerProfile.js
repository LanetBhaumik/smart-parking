import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

// actions
import { ownerProfile } from "../../redux/actions/ownerAction";
import { signOut } from "../../redux/actions/authAction";

import { Box, Button, Container, Grid, Typography } from "@mui/material";

import classes from "./OwnerProfile.module.css";
import { useMedia } from "react-use";
import ParkingCard from "../../components/ParkingCard";

const OwnerProfile = ({ ownerProfile, signOut }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const isMobile = useMedia("(max-width: 720px)");
  const [profile, setProfile] = useState({});
  const mountedRef = useRef(true);

  const onLoad = () => {
    setImageLoading(false);
  };

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
  }, [ownerProfile]);

  return (
    <>
      {Object.keys(profile).length !== 0 && (
        <Box
          className={classes.card}
          sx={{ width: isMobile ? "90vw" : "60vw" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              p: 1,
            }}
          >
            <img
              alt="profile-placeholder"
              width={256}
              src="/images/profile-placeholder.png"
              style={{ display: imageLoading ? "block" : "none" }}
            />
            <img
              alt="profile"
              width={256}
              src="/images/profile.jpg"
              style={{ display: imageLoading ? "none" : "block" }}
              onLoad={onLoad}
            />
          </Box>
          <div className={classes.container}>
            <Typography sx={{ m: 1 }}>
              <b>Name : </b>
              {profile.name}
            </Typography>

            <Typography sx={{ m: 1 }}>
              <b>Email : </b>
              {profile.email}
            </Typography>

            <Typography sx={{ m: 1 }}>
              <b>Mobile No : </b>
              {profile.mobile_no}
            </Typography>
            <div>
              <Typography sx={{ fontWeight: 600, m: 1 }}>
                Your Parkings :{" "}
              </Typography>
              <Container sx={{ py: 2 }} maxWidth="md">
                <Grid container spacing={4}>
                  {profile.parkings.map((parking) => {
                    return <ParkingCard parking={parking} key={parking._id} />;
                  })}
                </Grid>
              </Container>
            </div>
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
        </Box>
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
