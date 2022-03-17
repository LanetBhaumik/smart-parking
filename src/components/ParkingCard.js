import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//Material UI
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  CardActionArea,
} from "@material-ui/core";
import { DateTimePicker } from "@mui/lab";

//actions
import { bookSlot } from "../redux/actions/bookingAction";

const ParkingCard = ({ parking, bookSlot }) => {
  const [open, setOpen] = useState(false);
  const [inTime, setInTime] = useState(new Date());
  const [outTime, setOutTime] = useState(new Date());
  const [error, setError] = useState({
    inError: false,
    outError: false,
  });
  let duration = Math.ceil((outTime - inTime) / 3600000);
  let charge = duration * parking.rate;
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
      parking: parking._id,
      charge,
    });
  };

  return (
    <>
      <Grid item key={parking} xs={12} sm={6} md={4}>
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <CardActionArea component={Link} to={`/parking/${parking._id}`}>
            {/* <CardMedia
            component="img"
            sx={{
              // 16:9
              pt: "56.25%",
            }}
            image="https://source.unsplash.com/random"
            alt="random"
          /> */}

            <CardHeader
              title={parking.parking_name}
              subheader={`${parking.address} - ${parking.pincode}`}
            />

            <CardContent sx={{ flexGrow: 1 }}>
              <Typography
                paragraph
              >{`Total Slots: ${parking.total_slots}`}</Typography>
              <Typography
                paragraph
              >{`Rate: ${parking.rate} Rs./hour`}</Typography>
            </CardContent>
            {/* <CardActions>
            <Button variant="outlined" onClick={onBookHandle}>
              Book
            </Button>
          </CardActions> */}
          </CardActionArea>
        </Card>
      </Grid>

      <div>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Book Your Slot</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter your expected in and out time.
            </DialogContentText>
            <Typography>{`Parking name : ${parking.parking_name}`}</Typography>
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
              <Typography>{`Rate : ${parking.rate} Rs./hour`}</Typography>
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
    </>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { bookSlot })(ParkingCard);
