import React from "react";

import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";

import CustomLink from "../CustomLink/CustomLink";

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
          to="/"
          variant="h4"
          className={classes.logo}
          color="inherit"
        >
          Smart Parking
        </Typography>
        <div className={classes.navlinks}>
          <CustomLink to="/parkings" className={classes.link}>
            Parkings
          </CustomLink>
          {isUserLoggedIn && (
            <CustomLink to="/" className={classes.link}>
              Dashboard
            </CustomLink>
          )}
          {isUserLoggedIn && (
            <CustomLink to="/user/bookings" className={classes.link}>
              Bookings
            </CustomLink>
          )}

          {isUserLoggedIn && (
            <CustomLink to="/me" className={classes.link}>
              Profile
            </CustomLink>
          )}
          <Outlet/>
        </div>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
