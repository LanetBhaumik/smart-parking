import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { connect } from "react-redux";

import BookingDialog from "./BookingDialog";

import { Box, Modal, Typography } from "@mui/material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";

// css
import classes from "./TimelineModal.module.css";

const TimelineModal = ({ slot, bookings, parkings }) => {
  const currentTime = new Date().getTime();

  const params = useParams();
  const parkingId = params.parkingId;
  const parking = parkings[parkingId];
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const active = bookings.some((booking) => {
    const bookingIn = new Date(booking.in_time).getTime();
    const bookingOut = new Date(booking.out_time).getTime();
    return bookingIn <= currentTime && currentTime <= bookingOut;
  });
  const btnClass = active ? "OccupiedSlotBtn" : "AvailableSlotBtn";
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
  const getOptimizedBookings = (bookings) => {
    const optimizedBookings = [];
    const lastIndex = bookings.length - 1;
    for (let i = 0; i < lastIndex; i++) {
      const newIn = bookings[i].in_time;
      while (
        i < lastIndex &&
        bookings[i].out_time === bookings[i + 1].in_time
      ) {
        i++;
      }
      const newOut = bookings[i].out_time;
      optimizedBookings.push({
        status: "booked",
        in_time: newIn,
        out_time: newOut,
      });
    }
  };

  // const getTimeline = async (bookings) => {
  //   const currentTime = new Date().getTime();
  //   const optimizedBookings = await getOptimizedBookings(bookings);
  //   if (optimizedBookings.length === 0) return;
  //   const timeline = [];
  //   //   if (active) {
  //   //     timeline.push(optimizedBookings[0]);
  //   //   } else {
  //   //     timeline.push({
  //   //       status: "free",
  //   //       in_time: currentTime,
  //   //       out_time: optimizedBookings[0].in_time,
  //   //     });
  //   //   }
  //   for (let i = 0; i < optimizedBookings.length - 1; i++) {
  //     timeline.push(optimizedBookings[i]);
  //     timeline.push({
  //       status: "free",
  //       in_time: optimizedBookings[i].out_time,
  //       out_time: optimizedBookings[i + 1].in_time,
  //     });
  //   }
  //   return timeline;
  // };

  useEffect(() => {
    const optimization = async () => {
      await getOptimizedBookings(bookings);
    };
    optimization();
  }, []);
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
          <Timeline>
            {bookings.map((booking) => {
              return (
                <TimelineItem>
                  <TimelineOppositeContent>
                    {timeFormat(booking.in_time)}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color="error" />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    {timeFormat(booking.out_time)}
                  </TimelineContent>
                </TimelineItem>
              );
            })}
            <TimelineItem>
              <TimelineOppositeContent>In time</TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="success" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>Out time</TimelineContent>
            </TimelineItem>
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
                  parkingName: parking.parking_name,
                  parkingId: params.parkingId,
                  slot: slot,
                }}
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
