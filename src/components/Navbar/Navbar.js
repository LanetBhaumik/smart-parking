import React from "react";

import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { connect, useSelector } from "react-redux";

import CustomLink from "../CustomLink";
import { userSignOut } from "../../redux/actions/userAuth";

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

const Navbar = ({ userSignOut }) => {
  const Navigate = useNavigate();
  const { role } = useSelector((state) => state.auth);
  const classes = useStyles();

  const handleSignIn = () => {
    Navigate("/signin");
  };

  const handleUserSignUp = () => {
    Navigate("user/signup");
  };
  const handleOwnerSignUp = () => {
    Navigate("owner/signup");
  };
  const handleSignOut = () => {
    userSignOut();
  };
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
          {role === "" && (
            <Button
              variant="outlined"
              className={classes.link}
              onClick={handleSignIn}
            >
              Sign In
            </Button>
          )}
          {role === "" && (
            <Button
              variant="outlined"
              className={classes.link}
              onClick={handleUserSignUp}
            >
              User Sign Up
            </Button>
          )}
          {role === "" && (
            <Button
              variant="outlined"
              className={classes.link}
              onClick={handleOwnerSignUp}
            >
              Owner Sign Up
            </Button>
          )}

          {role === "user" && (
            <CustomLink to="/" className={classes.link}>
              Parkings
            </CustomLink>
          )}
          {role === "user" && (
            <CustomLink to="/user/bookings" className={classes.link}>
              Bookings
            </CustomLink>
          )}

          {role === "user" && (
            <CustomLink to="user/me" className={classes.link}>
              Profile
            </CustomLink>
          )}
          {role === "user" && (
            <Button
              variant="outlined"
              className={classes.link}
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          )}

          <Outlet />
        </div>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  userSignOut,
})(Navbar);
