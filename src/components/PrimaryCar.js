import React from "react";

// material ui
import {
  Box,
  CircularProgress,
  Fab,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";

const PrimaryCar = ({ profile }) => {
  const [primaryCar, setPrimaryCar] = React.useState(profile.car._id);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const handleButtonClick = () => {
    console.log("clicked");
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      console.log(primaryCar);

      // after request
      setSuccess(true);
      setLoading(false);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Typography sx={{ fontWeight: 600, m: 1 }}>Primary Car : </Typography>
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
            aria-label="save"
            color="primary"
            disabled={success}
            onClick={handleButtonClick}
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
  );
};

export default PrimaryCar;
