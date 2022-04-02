import React, { useState } from "react";

// material ui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  IconButton,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { connect } from "react-redux";

// actions
import { deleteCar } from "../redux/actions/userAction";
import { setAlert } from "../redux/actions/alertAction";

const DeleteCar = ({ profile, deleteCar, setProfile }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [carToBeDeleted, setCarToBeDeleted] = useState({
    id: "",
    car_no: "",
  });

  const onSubmitHandle = async () => {
    if (!loading) {
      setLoading(true);
      const data = await deleteCar(carToBeDeleted._id);
      if (data.type === "DELETE_CAR_SUCCESS") {
        setAlert("success", "car deleted successfully");
        setProfile(data.payload.user);
      } else {
        setAlert("error", data.payload.error);
      }
    }
    setLoading(false);
    setOpen(false);
  };

  const onDeleteHandle = (car) => {
    setOpen(true);
    setCarToBeDeleted(car);
  };

  return (
    <div>
      <Typography sx={{ fontWeight: 600, m: 1 }}>Your Cars : </Typography>
      {profile.cars.map((car) => {
        return (
          <Box
            sx={{ display: "flex", alignItems: "center", m: 1 }}
            key={car._id}
          >
            <Typography>{car.car_no}</Typography>
            <IconButton
              title="Delete Car"
              variant="outlined"
              onClick={() => onDeleteHandle(car)}
              style={{ color: "red" }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      })}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography style={{ color: "red" }}>
              {carToBeDeleted.car_no}
            </Typography>
            will be removed from your car list
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>No</Button>
          <Button onClick={onSubmitHandle} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { deleteCar })(DeleteCar);
