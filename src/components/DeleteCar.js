import React, { useState } from "react";

// material ui
import { Box, IconButton, Typography } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { connect } from "react-redux";

// actions
import { deleteCar } from "../redux/actions/userAction";
import { setAlert } from "../redux/actions/alertAction";
import ConfirmDialog from "./ConfirmDialog";

const DeleteCar = ({ profile, deleteCar, setProfile, setAlert }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [carToBeDeleted, setCarToBeDeleted] = useState({
    id: "",
    carNo: "",
  });

  const onSubmitHandle = async () => {
    if (!loading) {
      setLoading(true);
      const data = await deleteCar(carToBeDeleted._id);
      if (data.type === "DELETE_CAR_SUCCESS") {
        setAlert("success", "car deleted successfully");
        setProfile(data.payload.user);
      } else {
        setAlert("error", data.payload?.error);
      }
    }
    setLoading(false);
    setOpen(false);
  };

  const onDeleteHandle = (car) => {
    if (profile.cars.length === 1) {
      setAlert(
        "error",
        "Atleast one car is required. To remove this car add another car."
      );
      return;
    }
    setOpen(true);
    setCarToBeDeleted(car);
  };

  return (
    <>
      <div>
        <Typography sx={{ fontWeight: 600, m: 1 }}>Your Cars : </Typography>
        {profile.cars.map((car) => {
          return (
            <Box
              sx={{ display: "flex", alignItems: "center", m: 1 }}
              key={car._id}
            >
              <Typography>{car.carNo}</Typography>
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
      </div>
      {open && (
        <ConfirmDialog
          open={open}
          setOpen={setOpen}
          title={"Delete Car"}
          content={
            <>
              <Typography style={{ color: "red" }}>
                {carToBeDeleted.carNo}
              </Typography>
              will be removed from your car list
            </>
          }
          yes="Yes"
          no="No"
          onConfirm={onSubmitHandle}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { deleteCar, setAlert })(DeleteCar);
