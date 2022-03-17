import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { DateTimePicker } from "@mui/lab";

const BookingDialog = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [value, setValue] = React.useState(new Date());

  const handleChange = (newValue) => {
    console.log(newValue);
    setValue(newValue);
  };
  return (
    <div>
      <Button onClick={handleOpen}>Book Now</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Book Your Slot</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your expected in and out time.
          </DialogContentText>
          <Box>
            <DateTimePicker
              autoFocus
              label="in time"
              value={value}
              name="in_time"
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
          <Box>
            <DateTimePicker
              label="out time"
              name="out_time"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Book</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BookingDialog;
