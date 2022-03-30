import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useMedia } from "react-use";

// actions
import { userProfile } from "../../redux/actions/userAction";
import { signOut } from "../../redux/actions/authAction";

// css
import classes from "./UserProfile.module.css";

// material ui
import { Box, Button } from "@mui/material";
import AddCar from "../../components/AddCar";

const carNoFormat = (carNo) => {
  return `${carNo.slice(0, 2)} ${carNo.slice(2, 4)} ${carNo.slice(
    4,
    6
  )} ${carNo.slice(6)}`;
};

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
