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

const AddCar = ({ addCar, setAlert, setProfile }) => {
  const [car, setCar] = useState("");
  const [disabled, setDisabled] = useState(true);

  const handleCarChange = (e) => {
    const valid = /[A-Z]{2}[ ][0-9]{2}[ ][A-Z]{2}[ ][0-9]{4}/.test(
      e.target.value.toUpperCase()
    );
    if (valid) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
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

    addCar({ car: car }).then((data) => {
      if (data.type === "ADD_CAR_SUCCESS") {
        setAlert("success", "car added successfully");
        setProfile(data.payload.user);
      } else {
        setAlert("error", data.payload.error);
      }
    });
  };
  return (
    <div>
      <IconButton onClick={onAddHandle} title="Add Car">
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
            value={car}
            helperText="in XX 00 XX 0000 format"
            name="car"
            onChange={handleCarChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmitHandle} disabled={disabled}>
            Submit
          </Button>
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
