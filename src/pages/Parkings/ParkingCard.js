import React from "react";

//Material UI
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import { CardActions } from "@mui/material";

const ParkingCard = ({ parking }) => {
  return (
    <>
      <Grid item key={parking} xs={12} sm={6} md={4}>
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <CardMedia
            component="img"
            sx={{
              // 16:9
              pt: "56.25%",
            }}
            image="https://source.unsplash.com/random"
            alt="random"
          />
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
            >{`Available Slots: ${parking.available_slots}`}</Typography>
            <Typography
              paragraph
            >{`Rate: ${parking.rate} Rs./hour`}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Book</Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default ParkingCard;
