import React from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// material ui
import { AppBar, Box, Button, Link as MaterialLink } from "@mui/material";

// actions
import { signOut } from "../redux/actions/authAction";
import { setAlert } from "../redux/actions/alertAction";

const Navbar = ({ role, signOut, setAlert }) => {
  const Navigate = useNavigate();
  const handleSignOut = () => {
    signOut().then((data) => {
      if (data.type === "SIGNOUT") {
        setAlert("success", "sign out success");
        Navigate("/");
      }
    });
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
            Home
          </MaterialLink>
        </Box>
        <Box sx={{ fontWeight: "bold", m: 1 }}>
          <MaterialLink
            component={Link}
            to="/owner/parkings"
            underline="hover"
            color="inherit"
          >
            Parkings
          </MaterialLink>
        </Box>
        <Box sx={{ fontWeight: "bold", m: 1 }}>
          <MaterialLink
            component={Link}
            to="/owner/me"
            underline="hover"
            color="inherit"
          >
            Profile
          </MaterialLink>
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
    <AppBar position="fixed">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          minHeight: "65px",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
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
        </div>
        {(role === "user" || role === "owner") && (
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
        )}
      </div>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  role: state.auth.role,
});

export default connect(mapStateToProps, {
  signOut,
  setAlert,
})(Navbar);
