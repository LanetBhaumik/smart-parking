import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

// material ui
import {
  TextField,
  Typography,
  Button,
  Link as MaterialLink,
  Box,
  CircularProgress,
} from "@mui/material";

// actions
import { ownerSignUp } from "../../redux/actions/authAction";
import { setAlert } from "../../redux/actions/alertAction";

// css
import classes from "./OwnerSignUp.module.css";
import { useMedia } from "react-use";

const OwnerSignUp = ({ ownerSignUp, setAlert, token }) => {
  const Navigate = useNavigate();
  if (token) {
    Navigate("/");
  }
  const isMobile = useMedia("(max-width: 720px)");
  const [loading, setLoading] = useState(false);
  const [ownerData, setOwnerData] = useState({
    name: "",
    email: "",
    password: "",
    conPassword: "",
    mobile_no: "",
    car: "",
  });
  const [parking, setParking] = useState({
    parking_name: "",
    address: "",
    pincode: "",
    total_slots: "",
    rate: "",
  });

  const { name, email, password, conPassword, mobile_no } = ownerData;
  const { parking_name, address, pincode, total_slots, rate } = parking;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOwnerData({
      ...ownerData,
      [name]: value,
    });
  };
  const handleParkingChange = (e) => {
    const { name, value } = e.target;
    setParking({
      ...parking,
      [name]: value,
    });
  };

  const credIsValid = () => {
    if (mobile_no.length !== 10) {
      setAlert("error", "mobile_no is invalid");
      return false;
    } else if (pincode.length !== 6) {
      setAlert("error", "pincode is invalid");
      return false;
    } else if (total_slots < 10) {
      setAlert("error", "you must have more then 10 slots");
      return false;
    } else if (password.length < 7) {
      setAlert("error", "password must be greater than 6 characters");
      return false;
    } else if (password !== conPassword) {
      setAlert("error", "Password and Confirm password does't match");

      return false;
    } else return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!credIsValid()) {
      setLoading(false);
      return;
    }
    const signUpRequest = async (payload) => {
      const data = await ownerSignUp(payload);
      if (data.type === "INVALID_DATA") {
        setAlert("error", data.payload.error);
      } else {
        setAlert("success", "Sign up success");
        Navigate("/owner/parkings");
      }
      setLoading(false);
    };
    signUpRequest({ ...ownerData, parking });
  };

  return (
    <>
      <Box sx={{ width: isMobile ? "100vw" : "60vw", margin: "auto" }}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.container}>
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              margin="normal"
              align="center"
            >
              Sign Up To List Your Park
            </Typography>
            <Box>
              <TextField
                id="name"
                label="name"
                variant="outlined"
                required
                type="text"
                margin="normal"
                value={name}
                name="name"
                onChange={handleChange}
                fullWidth
              />
            </Box>
            <Box>
              <TextField
                id="email"
                label="email"
                variant="outlined"
                required
                type="email"
                margin="normal"
                value={email}
                name="email"
                onChange={handleChange}
                fullWidth
              />
            </Box>
            <Box>
              <TextField
                id="mobile_no"
                label="mobile_no"
                variant="outlined"
                required
                type="tel"
                margin="normal"
                value={mobile_no}
                name="mobile_no"
                onChange={handleChange}
                fullWidth
              />
            </Box>

            <div>
              <div className={classes.parkingForm}>
                <div className={classes.container}>
                  <Typography
                    variant="h4"
                    gutterBottom
                    component="div"
                    margin="normal"
                    align="center"
                  >
                    Parking Details
                  </Typography>
                  <Box>
                    <TextField
                      id="parking_name"
                      label="Name of Parking"
                      variant="outlined"
                      required
                      type="text"
                      margin="normal"
                      value={parking_name}
                      name="parking_name"
                      onChange={handleParkingChange}
                      fullWidth
                    />
                  </Box>
                  <Box>
                    <TextField
                      id="address"
                      label="Parking Address"
                      variant="outlined"
                      required
                      type="text"
                      margin="normal"
                      value={address}
                      name="address"
                      onChange={handleParkingChange}
                      fullWidth
                    />
                  </Box>
                  <Box>
                    <TextField
                      id="pincode"
                      label="Pincode"
                      variant="outlined"
                      required
                      type="text"
                      margin="normal"
                      value={pincode}
                      name="pincode"
                      onChange={handleParkingChange}
                      fullWidth
                    />
                  </Box>
                  <Box>
                    <TextField
                      id="total_slots"
                      label="Total slots"
                      variant="outlined"
                      required
                      type="text"
                      margin="normal"
                      value={total_slots}
                      name="total_slots"
                      onChange={handleParkingChange}
                      fullWidth
                    />
                  </Box>
                  <Box>
                    <TextField
                      id="rate"
                      label="Rate of parking"
                      helperText="per hour in rupees"
                      variant="outlined"
                      required
                      type="text"
                      margin="normal"
                      value={rate}
                      name="rate"
                      onChange={handleParkingChange}
                      fullWidth
                    />
                  </Box>
                </div>
              </div>
            </div>
            <Box>
              <TextField
                id="password"
                label="password"
                type="password"
                variant="outlined"
                margin="normal"
                name="password"
                required
                value={password}
                onChange={handleChange}
                fullWidth
              />
            </Box>
            <Box>
              <TextField
                id="conPassword"
                label="confirm Password"
                type="password"
                variant="outlined"
                margin="normal"
                name="conPassword"
                required
                value={conPassword}
                onChange={handleChange}
                fullWidth
              />
            </Box>
            <Box component="div" sx={{ m: 1, position: "relative" }}>
              <Button
                type="submit"
                variant="contained"
                margin="normal"
                fullWidth
                disabled={loading}
              >
                Sign Up
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Box>
            <Box sx={{ justifyContent: "center", textAlign: "center", m: 1 }}>
              <MaterialLink component={Link} to="/signin" variant="body2">
                {"Already have an account? Sign in"}
              </MaterialLink>
            </Box>
          </div>
        </form>
      </Box>
    </>
  );
};
const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps, {
  ownerSignUp,
  setAlert,
})(OwnerSignUp);
