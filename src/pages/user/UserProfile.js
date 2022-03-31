import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useMedia } from "react-use";

// components
import AddCar from "../../components/AddCar";

// actions
import { userProfile } from "../../redux/actions/userAction";
import { signOut } from "../../redux/actions/authAction";

// css
import classes from "./UserProfile.module.css";

// material ui
import { Box, Button, Typography } from "@mui/material";
import PrimaryCar from "../../components/PrimaryCar";
import DeleteCar from "../../components/DeleteCar";

const UserProfile = ({ userProfile, signOut }) => {
  const [imageLoading, setImageLoading] = useState(true);

  const onLoad = () => {
    setImageLoading(false);
  };
  const isMobile = useMedia("(max-width: 720px)");
  const [profile, setProfile] = useState({});
  const mountedRef = useRef(true);

  const onSignOutHandle = () => {
    signOut();
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await userProfile();
      if (data.type === "USER_PROFILE") {
        if (!mountedRef.current) return null;
        setProfile(data.payload);
      }
    };

    fetchProfile();

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <>
      {profile && Object.keys(profile).length > 0 && (
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

            <PrimaryCar profile={profile} />
            <DeleteCar profile={profile} />
            <AddCar />
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

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {
  userProfile,
  signOut,
})(UserProfile);
