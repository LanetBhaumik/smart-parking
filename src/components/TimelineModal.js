import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { connect } from "react-redux";

import BookingDialog from "./BookingDialog";

// material ui
import { Box, IconButton, Modal, Typography } from "@mui/material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import CancelIcon from "@mui/icons-material/Cancel";

// css
import classes from "./TimelineModal.module.css";

const pad = (n) => (n < 10 ? "0" + n : n);
const timeFormat = (date) => {
  date = new Date(date);
  let hh = date.getHours();
  const min = pad(date.getMinutes());

  const ampm = hh >= 12 ? "PM" : "AM";
  hh = hh % 12;
  hh = hh ? hh : 12; // the hour '0' should be '12'
  hh = pad(hh);
  return `${hh}:${min} ${ampm}`;
};

// timeline logic
const getTimeline = (bkgs) => {
  const currentTime = new Date().getTime();
  if (bkgs.length === 0)
    return [
      {
        color: "success",
        inTime: currentTime,
        outTime: new Date().setHours(12, 0),
      },
    ];
  const timelineArray = [];
  for (let i = 0; i < bkgs.length - 1; i++) {
    timelineArray.push(bkgs[i]);
    timelineArray.push({
      color: "success",
      inTime: bkgs[i].outTime,
      outTime: bkgs[i + 1].inTime,
    });
  }
  timelineArray.push(bkgs[bkgs.length - 1]);

  return timelineArray;
};

const TimelineModal = ({ slot, bookings, parking }) => {
  const [timeline, setTimeline] = useState([]);
  const [open, setOpen] = useState(false);
  const currentTime = new Date().getTime();

  const { parkingId } = useParams();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60vw",
    bgcolor: "background.paper",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const active = bookings.some((booking) => {
    const bookingIn = new Date(booking.inTime).getTime();
    const bookingOut = new Date(booking.outTime).getTime();
    return bookingIn <= currentTime && currentTime <= bookingOut;
  });
  const btnClass = active ? "OccupiedSlotBtn" : "AvailableSlotBtn";
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const newTimeline = getTimeline(bookings);
    setTimeline(newTimeline);
  }, [bookings]);

  return (
    <>
      <button className={classes[btnClass]} onClick={handleOpen}>
        <h2>{slot}</h2>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <Box sx={{ textAlign: "right" }}>
            <IconButton onClick={handleClose} style={{ padding: 0 }}>
              <CancelIcon />
            </IconButton>
          </Box>
          <Timeline>
            {timeline.map((booking, i) => {
              return (
                <TimelineItem key={i}>
                  <TimelineOppositeContent>
                    {timeFormat(booking.inTime)}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color={booking.color} />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    {timeFormat(booking.outTime)}
                  </TimelineContent>
                </TimelineItem>
              );
            })}
          </Timeline>

          {parking && (
            <Box
              textAlign="center"
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <TimelineDot color="success" />
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    m: 1,
                  }}
                >
                  Free Time
                </Typography>
              </Box>
              <BookingDialog
                parking={{
                  rate: parking.rate,
                  parkingName: parking.parkingName,
                  parkingId: parkingId,
                  slot: slot,
                }}
                bookings={bookings}
              />
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <TimelineDot color="error" />
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    m: 1,
                  }}
                >
                  Booked Time
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  parkings: state.parkings,
});

export default connect(mapStateToProps, {})(TimelineModal);
