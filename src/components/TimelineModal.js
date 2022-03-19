import { Box, Modal } from "@material-ui/core";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import React from "react";
import BookingDialog from "./BookingDialog";
import { useParams } from "react-router";
import { connect } from "react-redux";

// css
import classes from "./TimelineModal.module.css";

const TimelineModal = ({ slot, bookings, list }) => {
  const params = useParams();
  const parkingId = params.parkingId;
  const parking = list.find((item) => item._id === parkingId);
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

  const btnClass =
    bookings.length === 0 ? "AvailableSlotBtn" : "OccupiedSlotBtn";
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
            <TimelineItem>
              <TimelineOppositeContent>In time</TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="success" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>Out time</TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent>In time</TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="error" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>Out time</TimelineContent>
            </TimelineItem>
          </Timeline>
          <BookingDialog
            rate={parking.rate}
            parkingName={parking.parking_name}
            parkingId={params.parkingId}
            slot={slot}
          />
        </Box>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  list: state.parking.list,
});

export default connect(mapStateToProps, {})(TimelineModal);
