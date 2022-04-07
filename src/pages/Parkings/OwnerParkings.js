import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

// actions
import { ownerProfile, addParking } from "../../redux/actions/ownerAction";

// css
import classes from "./OwnerParkings.module.css";

// material ui
import { Box, CircularProgress } from "@mui/material";

import ParkingItem from "./ParkingItem";
import AddParking from "../../components/AddParking";

const OwnerParkings = ({ ownerProfile, owner }) => {
  const [loading, setLoading] = useState(true);
  const { profile } = owner;
  const mountedRef = useRef(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await ownerProfile();
      if (!mountedRef.current) return null;
      if (data.type === "OWNER_PROFILE") setLoading(false);
    };
    fetchProfile();
    return () => {
      mountedRef.current = false;
    };
  }, [ownerProfile]);

  return (
    <>
      <div>
        <h2 className={classes.heading}>Your Parkings</h2>
        <Box textAlign="center">
          <AddParking />
          {loading && <CircularProgress sx={{ m: 2 }} />}
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
