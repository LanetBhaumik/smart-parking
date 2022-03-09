import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));

const Navbar = () => {
  const auth = useSelector((state) => state.auth);
  const isUserLoggedIn = auth.token && auth.token !== "";
  const classes = useStyles();
  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography
          component={Link}
          to="/userDashboard"
          variant="h4"
          className={classes.logo}
          color="inherit"
        >
          Smart Parking
        </Typography>
        <div className={classes.navlinks}>
          <Link to="/parkings" className={classes.link}>
            Home
          </Link>
          {isUserLoggedIn && (
            <Link to="/userDashboard" className={classes.link}>
              Dashboard
            </Link>
          )}
          {isUserLoggedIn && (
            <Link to="/UserBookings" className={classes.link}>
              Bookings
            </Link>
          )}

          {isUserLoggedIn && (
            <Link to="/me" className={classes.link}>
              Profile
            </Link>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
