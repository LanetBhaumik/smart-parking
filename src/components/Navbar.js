import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// material ui
import {
  AppBar,
  Box,
  Button,
  Link as MaterialLink,
  Toolbar,
} from "@mui/material";

// actions
import { signOut } from "../redux/actions/authAction";

const Navbar = ({ role, signOut }) => {
  const handleSignOut = () => {
    signOut();
  };

  let links = null;
  if (role === "user") {
    links = (
      <>
        <Box sx={{ fontWeight: "bold", m: 1 }}>
          <MaterialLink
            component={Link}
            to="/parkings"
            underline="hover"
            color="inherit"
          >
            Parkings
          </MaterialLink>
        </Box>
        <Box sx={{ fontWeight: "bold", m: 1 }}>
          <MaterialLink
            component={Link}
            to="/user/bookings"
            underline="hover"
            color="inherit"
          >
            Bookings
          </MaterialLink>
        </Box>
        <Box sx={{ fontWeight: "bold", m: 1 }}>
          <MaterialLink
            component={Link}
            to="/user/me"
            underline="hover"
            color="inherit"
          >
            Profile
          </MaterialLink>
        </Box>
        <Box sx={{ m: 1 }}>
          <Button
            variant="outlined"
            color="inherit"
            sx={{ fontWeight: "bold" }}
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </Box>
      </>
    );
  } else if (role === "owner") {
    links = (
      <>
        <Box sx={{ fontWeight: "bold", m: 1 }}>
          <MaterialLink
            component={Link}
            to="/parkings"
            underline="hover"
            color="inherit"
          >
            Parkings
          </MaterialLink>
        </Box>
        <Box sx={{ fontWeight: "bold", m: 1 }}>
          <MaterialLink
            component={Link}
            to="/user/bookings"
            underline="hover"
            color="inherit"
          >
            Bookings
          </MaterialLink>
        </Box>
        <Box sx={{ fontWeight: "bold", m: 1 }}>
          <MaterialLink
            component={Link}
            to="/user/me"
            underline="hover"
            color="inherit"
          >
            Profile
          </MaterialLink>
        </Box>
        <Box sx={{ m: 1 }}>
          <Button
            variant="outlined"
            color="inherit"
            sx={{ fontWeight: "bold" }}
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </Box>
      </>
    );
  } else {
    links = (
      <>
        <Box sx={{ fontWeight: "bold", m: 1 }}>
          <MaterialLink
            component={Link}
            to="/signin"
            underline="hover"
            color="inherit"
          >
            Sign In
          </MaterialLink>
        </Box>
        <Box sx={{ fontWeight: "bold", m: 1 }}>
          <MaterialLink
            component={Link}
            to="/user/signup"
            underline="hover"
            color="inherit"
          >
            User Sign Up
          </MaterialLink>
        </Box>
        <Box sx={{ fontWeight: "bold", m: 1 }}>
          <MaterialLink
            component={Link}
            to="/owner/signup"
            underline="hover"
            color="inherit"
          >
            Owner Sign Up
          </MaterialLink>
        </Box>
      </>
    );
  }

  return (
    <AppBar>
      <Toolbar>
        <Box
          component={Link}
          to="/"
          color="inherit"
          sx={{
            fontSize: 20,
            fontFamily: "Monospace",
            fontWeight: "bold",
            m: 1,
            textDecoration: "none",
          }}
        >
          Smart Parking
        </Box>
        {links}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  role: state.auth.role,
});

export default connect(mapStateToProps, {
  signOut,
})(Navbar);
