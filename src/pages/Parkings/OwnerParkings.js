import React, { useEffect } from "react";
import { connect } from "react-redux";

// actions
import { ownerProfile, addParking } from "../../redux/actions/ownerAction";

// css
import classes from "./OwnerParkings.module.css";

// material ui
import { Box } from "@material-ui/core";

import ParkingItem from "./ParkingItem";
import AddParking from "../../components/AddParking";

const OwnerParkings = ({ ownerProfile, owner }) => {
  const { profile } = owner;
  useEffect(() => {
    console.log("useEffect in owner parking");
    ownerProfile();
  }, []);

  return (
    <>
      <div>
        <h2 className={classes.heading}>Your Parkings</h2>
        <Box textAlign="center">
          <AddParking />
        </Box>
        {profile && profile.parkings && profile.parkings.length < 1 && (
          <h3 className={classes.nothing}>No Parkings</h3>
        )}

        {profile && profile.parkings && profile.parkings.length >= 1 && (
          <div className={classes["places-center"]}>
            {profile.parkings.map((parking) => {
              return <ParkingItem key={parking._id} parking={parking} />;
            })}
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  owner: state.owner,
});

export default connect(mapStateToProps, {
  ownerProfile,
  addParking,
})(OwnerParkings);
