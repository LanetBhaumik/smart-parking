import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { DialogContent } from "@mui/material";
import { connect } from "react-redux";

// action
import { addParking } from "../redux/actions/ownerAction";

const AddParking = ({ addParking }) => {
  const [parking, setParking] = useState({
    parking_name: "",
    address: "",
    pincode: "",
    total_slots: "",
    rate: "",
  });

  const handleParkingChange = (e) => {
    const { name, value } = e.target;
    setParking({
      ...parking,
      [name]: value,
    });
    console.log(parking);
  };

  const { parking_name, address, pincode, total_slots, rate } = parking;
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
    <div>
      <Button variant="contained" onClick={onAddHandle}>
        Add Parking
      </Button>
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
  );
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  addParking,
})(AddParking);
