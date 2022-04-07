import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//Material UI
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  CardActionArea,
} from "@mui/material";

const ParkingCard = ({ parking }) => {
  return (
    <>
      <Grid item key={parking} xs={12} sm={6} md={4}>
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <CardActionArea component={Link} to={`/parkings/${parking._id}`}>
            <CardHeader
              title={parking.parkingName}
              subheader={`${parking.address} - ${parking.pincode}`}
            />

            <CardContent sx={{ flexGrow: 1 }}>
              <Typography
                paragraph
              >{`Total Slots: ${parking.totalSlots}`}</Typography>
              <Typography
                paragraph
              >{`Rate: ${parking.rate} Rs./hour`}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(ParkingCard);
