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
} from "@mui/material";

// actions
import { ownerSignUp } from "../../redux/actions/authAction";

// css
import classes from "./OwnerSignUp.module.css";

const OwnerSignUp = ({ ownerSignUp }) => {
  const Navigate = useNavigate();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!credIsValid()) return;
    ownerSignUp({ ...ownerData, parking });
    Navigate("/");
  };

  return (
    <>
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
          <Box component="div" style={{ marginTop: "12px" }}>
            <Button type="submit" variant="contained" margin="normal" fullWidth>
              Sign Up
            </Button>
          </Box>
          <div style={{ justifyContent: "center", textAlign: "center" }}>
            <MaterialLink component={Link} to="/signin" variant="body2">
              {"Already have an account? Sign in"}
            </MaterialLink>
          </div>
        </div>
      </form>
    </>
  );
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  ownerSignUp,
})(OwnerSignUp);
