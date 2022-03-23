import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

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
} from "@mui/material";
import { DateTimePicker } from "@mui/lab";

//actions
import { bookSlot } from "../redux/actions/bookingAction";
import { setAlert } from "../redux/actions/alertAction";

const BookingDialog = ({ parking, bookSlot, role, setAlert }) => {
  const { rate, parkingId, parkingName, slot } = parking;
  const currentTime = new Date();
  const [inTime, setInTime] = useState(
    new Date().setHours(currentTime.getHours() + 1, 0, 0, 0)
  );
  const [outTime, setOutTime] = useState(
    new Date().setHours(currentTime.getHours() + 2, 0, 0, 0)
  );
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({
    inError: false,
    outError: false,
  });
  let duration = Math.ceil((outTime - inTime) / 3600000);
  let charge = duration * rate;

  const Navigate = useNavigate();
  const handleOpen = () => {
    if (role === "user") {
      setOpen(true);
    } else {
      Navigate("/user/signup");
    }
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
    console.log("on submit --------------", inTime, outTime);
    bookSlot({
      in_time: inTime,
      out_time: outTime,
      parking: parkingId,
      charge,
      slot,
    }).then((data) => {
      if (data.type === "BOOKING_FAILED") {
        setAlert("error", data.payload.error);
      } else {
        setAlert("success", "Parking slot booked");
        Navigate("/user/bookings");
      }
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
          <Box sx={{ m: 2 }}>
            <DateTimePicker
              autoFocus
              label="in time"
              value={inTime}
              name="inTime"
              onChange={(newInTime) => setInTime(new Date(newInTime).getTime())}
              minDateTime={currentTime}
              maxDateTime={new Date().setMonth(currentTime.getMonth() + 1)}
              renderInput={(params) => <TextField {...params} />}
              onError={(e) => onInError(e)}
            />
          </Box>
          <Box sx={{ m: 2 }}>
            <DateTimePicker
              label="out time"
              name="outTime"
              value={outTime}
              onChange={(newOutTime) =>
                setOutTime(new Date(newOutTime).getTime())
              }
              minDateTime={inTime + 300000} // inTime + 5 minutes
              maxDateTime={new Date().setMonth(currentTime.getMonth() + 1)}
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

const mapStateToProps = (state) => ({
  role: state.auth.role,
});

export default connect(mapStateToProps, { bookSlot, setAlert })(BookingDialog);
