import React, { useState } from "react";
import { connect } from "react-redux";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";

// action
import { addCar } from "../redux/actions/userAction";
import { setAlert } from "../redux/actions/alertAction";

import AddIcon from "@mui/icons-material/Add";

const AddCar = ({ addCar, setAlert }) => {
  const [car, setCar] = useState();

  const handleCarChange = (e) => {
    setCar(e.target.value);
  };
  const [open, setOpen] = useState(false);

  const onAddHandle = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmitHandle = () => {
    setOpen(false);

    addCar(car).then((data) => {
      if (data.type === "ADD_CAR_SUCCESS") {
        setAlert("success", "car added successfully");
      } else {
        setAlert("error", data.payload.error);
      }
    });
  };
  return (
    <div>
      <IconButton onClick={onAddHandle}>
        <AddIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Car</DialogTitle>
        <DialogContent>
          <DialogContentText>Add details of your car</DialogContentText>
          <TextField
            id="car"
            label="Car No"
            variant="outlined"
            required
            type="text"
            margin="normal"
            // value={parking_name}
            name="parking_name"
            onChange={handleCarChange}
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
  addCar,
  setAlert,
})(AddCar);
