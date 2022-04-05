import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

// material ui
import {
  Box,
  Button,
  CircularProgress,
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

//logic of time is occupied or not
const validateOperation = (requestedIn, requestedOut, bookings) => {
  const occupied = bookings.some((booking) => {
    const bookedIn = new Date(booking.in_time).getTime();
    const bookedOut = new Date(booking.out_time).getTime();
    return (
      (bookedIn <= requestedIn && requestedIn < bookedOut) ||
      (bookedIn < requestedOut && requestedOut <= bookedOut)
    );
  });
  return !occupied;
};

const BookingDialog = ({ parking, bookSlot, role, setAlert, bookings }) => {
  const [loading, setLoading] = useState(false);
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
      Navigate("/signin");
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

  const onSubmitHandle = async () => {
    const valid = validateOperation(inTime, outTime, bookings);
    if (valid && !loading) {
      setLoading(true);
      const data = await bookSlot({
        in_time: inTime,
        out_time: outTime,
        parking: parkingId,
        charge,
        slot,
      });
      if (data.type === "NEW_BOOKING_ERROR") {
        setAlert("error", data.payload.error);
      } else {
        setAlert("success", "Parking slot booked");
        Navigate("/user/bookings");
      }
    } else {
      setAlert("error", "This time is already booked on this slot.");
    }
    setLoading(false);
    setOpen(false);
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
          <Box sx={{ m: 1, position: "relative" }}>
            <Button
              onClick={onSubmitHandle}
              disabled={loading || error.inError || error.outError}
            >
              Book
            </Button>
            {loading && (
              <CircularProgress
                size={20}
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
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  role: state.auth.role,
});

export default connect(mapStateToProps, { bookSlot, setAlert })(BookingDialog);
