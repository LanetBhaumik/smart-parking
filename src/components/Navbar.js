import React from "react";
import { connect } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";

import CustomLink from "./CustomLink";

// actions
import { signOut } from "../redux/actions/authAction";

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

const Navbar = ({ signOut, auth }) => {
  const classes = useStyles();
  const Navigate = useNavigate();

  const { role } = auth;

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
    signOut();
  };

  let links = null;
  if (role === "user") {
    links = (
      <>
        <CustomLink to="/parkings" className={classes.link}>
          Parkings
        </CustomLink>
        <CustomLink to="/user/bookings" className={classes.link}>
          Bookings
        </CustomLink>
        <CustomLink to="user/me" className={classes.link}>
          Profile
        </CustomLink>
        <Button
          variant="outlined"
          className={classes.link}
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </>
    );
  } else if (role === "owner") {
    links = (
      <>
        <CustomLink to="/" className={classes.link}>
          Home
        </CustomLink>
        <CustomLink to="/owner/parkings" className={classes.link}>
          Parkings
        </CustomLink>
        <CustomLink to="/owner/me" className={classes.link}>
          Profile
        </CustomLink>
        <Button
          variant="outlined"
          className={classes.link}
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </>
    );
  } else {
    links = (
      <div>
        <Button
          variant="outlined"
          className={classes.link}
          onClick={handleSignIn}
        >
          Sign In
        </Button>
        <Button
          variant="outlined"
          className={classes.link}
          onClick={handleUserSignUp}
        >
          User Sign Up
        </Button>
        <Button
          variant="outlined"
          className={classes.link}
          onClick={handleOwnerSignUp}
        >
          Owner Sign Up
        </Button>
      </div>
    );
  }

  return (
    <AppBar position="relative">
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
          {links}
          <Outlet />
        </div>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  signOut,
})(Navbar);
