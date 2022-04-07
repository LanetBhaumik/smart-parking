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
import { setAlert } from "../redux/actions/alertAction";

const AddParking = ({ addParking, setAlert }) => {
  const [parking, setParking] = useState({
    parkingName: "",
    address: "",
    pincode: "",
    totalSlots: "",
    rate: "",
  });

  const handleParkingChange = (e) => {
    const { name, value } = e.target;
    setParking({
      ...parking,
      [name]: value,
    });
  };

  const { parkingName, address, pincode, totalSlots, rate } = parking;
  const [open, setOpen] = React.useState(false);

  const onAddHandle = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmitHandle = () => {
    setOpen(false);

    addParking(parking).then((data) => {
      if (data.type === "ADD_PARKING_SUCCESS") {
        setAlert("success", "parking added");
      } else {
        setAlert("error", data.payload.error);
      }
    });
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
            id="parkingName"
            label="Name of Parking"
            variant="outlined"
            required
            type="text"
            margin="normal"
            value={parkingName}
            name="parkingName"
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
            id="totalSlots"
            label="Total slots"
            variant="outlined"
            required
            type="text"
            margin="normal"
            value={totalSlots}
            name="totalSlots"
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
  setAlert,
})(AddParking);
