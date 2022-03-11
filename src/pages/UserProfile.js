import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { userProfile } from "../redux/actions/userAuth";

import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";

const UserProfile = ({ userProfile }) => {
  const Navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    (!token || token === "") && Navigate("/");
  }, [token]);

  const { user } = useSelector((state) => state.auth);
  if (!user) {
    userProfile();
  }
  return (
    <>
      {user && (
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="/images/profile.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {user.name}
              </Typography>
              <Typography variant="body2">{`Email: ${user.email}`}</Typography>
              <Typography variant="body2">
                {`Mobile No: ${user.mobile_no}`}
              </Typography>
              <Typography variant="body2">
                {`Primary Car : ${user.car.car_no}`}
              </Typography>
              <Typography variant="body2">{`Your Cars : `}</Typography>
              {user.cars.map((car) => (
                <Typography key={car.car_no}>{`${car.car_no}`}</Typography>
              ))}
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Sign Out
            </Button>
          </CardActions>
        </Card>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  userProfile,
})(UserProfile);
