import React, { useState } from "react";

// material ui
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core";
import { DateTimePicker } from "@mui/lab";

//actions
import { bookSlot } from "../redux/actions/bookingAction";
import { connect } from "react-redux";

const BookingDialog = ({ rate, parkingId, parkingName, slot }) => {
  console.log(rate, parkingId, parkingName, slot);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({
    inError: false,
    outError: false,
  });
  const [inTime, setInTime] = useState(new Date());
  const [outTime, setOutTime] = useState(new Date());
  let duration = Math.ceil((outTime - inTime) / 3600000);
  let charge = duration * rate;

  const handleOpen = () => {
    setOpen(true);
  };
  const onInError = (e) => {
    !e
      ? setError((prevError) => {
          return { ...prevError, inError: false };
        })
      : setError((prevError) => {
          return { ...prevError, inError: true };
        });
  };
  const onOutError = (e) => {
    !e
      ? setError((prevError) => {
          return { ...prevError, outError: false };
        })
      : setError((prevError) => {
          return { ...prevError, outError: true };
        });
  };

  const onSubmitHandle = () => {
    setOpen(false);
    bookSlot({
      in_time: inTime,
      out_time: outTime,
      parking: parkingId,
      charge,
      slot,
    });
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Book
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Book Your Slot</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your expected in and out time.
          </DialogContentText>
          <Typography>{`Parking name : ${parkingName}`}</Typography>
          <Box>
            <DateTimePicker
              autoFocus
              label="in time"
              value={inTime}
              name="inTime"
              onChange={(newInTime) => setInTime(newInTime)}
              minDateTime={new Date()}
              renderInput={(params) => <TextField {...params} />}
              onError={(e) => onInError(e)}
            />
          </Box>
          <Box>
            <DateTimePicker
              label="out time"
              name="outTime"
              value={outTime}
              onChange={(newOutTime) => setOutTime(newOutTime)}
              minDateTime={inTime}
              maxDateTime={new Date().setDate(inTime.getDate() + 7)}
              renderInput={(params) => <TextField {...params} />}
              onError={(e) => onOutError(e)}
            />
          </Box>
          <Box>
            <Typography>{`Rate : ${rate} Rs./hour`}</Typography>
            <Typography>{`Duration :  ${duration} hours`}</Typography>
            <Typography>{`Net Amount :  ${charge} Rs.`}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={onSubmitHandle}
            disabled={error.inError || error.outError}
          >
            Book
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { bookSlot })(BookingDialog);
