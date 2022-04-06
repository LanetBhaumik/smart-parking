import React, { useState } from "react";
import { connect } from "react-redux";

// material ui
import {
  Box,
  CircularProgress,
  Fab,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Check as CheckIcon, Save as SaveIcon } from "@mui/icons-material";

// action
import { makeCarPrimary } from "../redux/actions/userAction";
import { setAlert } from "../redux/actions/alertAction";

const PrimaryCar = ({ profile, setProfile, makeCarPrimary, setAlert }) => {
  const [primaryCar, setPrimaryCar] = useState(profile.car._id);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      const data = await makeCarPrimary(primaryCar);
      if (data.type === "PRIMARY_CAR_SUCCESS") {
        setAlert(
          "success",
          `${data.payload.user.car.car_no} is now your primary car`
        );
        setProfile(data.payload.user);
      } else {
        setAlert("error", data.payload.error);
      }
      setSuccess(true);
      setLoading(false);
    }
  };
  return (
    <Box sx={{ m: 1 }}>
      <Typography sx={{ fontWeight: 600 }}>Primary Car : </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Select
          value={primaryCar}
          onChange={(e) => {
            setSuccess(false);
            setPrimaryCar(e.target.value);
          }}
        >
          {profile.cars.map((car) => (
            <MenuItem key={car._id} value={car._id}>
              {car.car_no}
            </MenuItem>
          ))}
        </Select>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ m: 1, position: "relative" }}>
            <Fab
              title="make primary"
              aria-label="save"
              color="primary"
              disabled={success}
              onClick={handleSubmit}
            >
              {success ? <CheckIcon /> : <SaveIcon />}
            </Fab>
            {loading && (
              <CircularProgress
                size={68}
                sx={{
                  position: "absolute",
                  top: -6,
                  left: -6,
                  zIndex: 1,
                }}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { makeCarPrimary, setAlert })(
  PrimaryCar
);
