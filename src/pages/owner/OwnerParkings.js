import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router";

// actions
import { ownerProfile, addParking } from "../../redux/actions/ownerAction";

// css
import classes from "./OwnerParkings.module.css";

// material ui
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { DialogContent } from "@mui/material";

import ParkingItem from "./ParkingItem";

const OwnerParkings = ({ ownerProfile, addParking }) => {
  const [parking, setParking] = useState({
    parking_name: "",
    address: "",
    pincode: "",
    total_slots: "",
    rate: "",
  });
  const { parking_name, address, pincode, total_slots, rate } = parking;

  const handleParkingChange = (e) => {
    const { name, value } = e.target;
    setParking({
      ...parking,
      [name]: value,
    });
    console.log(parking);
  };
  const { owner, auth } = useSelector((state) => state);
  const { role, token } = auth;

  const Navigate = useNavigate();
  if (!token || role === "user") {
    Navigate("/signin");
  }
  const { profile } = owner;
  useEffect(() => {
    ownerProfile();
  }, []);

  const [open, setOpen] = React.useState(false);

  const onAddHandle = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmitHandle = () => {
    setOpen(false);

    addParking(parking);
  };

  return (
    <>
      <div>
        <h2 className={classes.heading}>Your Parkings</h2>
        <Box textAlign="center">
          <Button variant="contained" onClick={onAddHandle}>
            Add Parking
          </Button>
        </Box>
        {profile && profile.parkings && profile.parkings.length < 1 && (
          <h3 className={classes.nothing}>No Parkings</h3>
        )}

        {profile && profile.parkings && profile.parkings.length >= 1 && (
          <div className={classes["places-center"]}>
            {profile.parkings.map((parking) => {
              return <ParkingItem key={parking._id} parking={parking} />;
            })}
          </div>
        )}
      </div>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New Parking</DialogTitle>
          <DialogContent>
            <DialogContentText>Add details of your paking</DialogContentText>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={onSubmitHandle}>Submit</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  ownerProfile,
  addParking,
})(OwnerParkings);
