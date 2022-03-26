import React from "react";
import { connect } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useMedia } from "react-use";
import DrawerComponent from "./DrawerComponent";

// material ui
import {
  AppBar,
  Box,
  Button,
  Link as MaterialLink,
  Toolbar,
  Typography,
} from "@mui/material";

// actions
import { signOut } from "../../redux/actions/authAction";
import { setAlert } from "../../redux/actions/alertAction";

const Navbar = ({ role, signOut, setAlert }) => {
  const isMobile = useMedia("(max-width: 720px)");
  const Navigate = useNavigate();
  const handleSignOut = () => {
    signOut().then((data) => {
      if (data.type === "SIGNOUT") {
        setAlert("success", "sign out success");
        Navigate("/");
      }
    });
  };

  const CustomNavItem = (path, title) => {
    return (
      <Box sx={{ fontWeight: "bold", m: 1 }}>
        <MaterialLink
          component={NavLink}
          to={path}
          underline="hover"
          color="inherit"
          sx={{
            p: 1,
          }}
          style={({ isActive }) =>
            isActive
              ? {
                  background: "#0c56a5",
                  borderRadius: "4px",
                }
              : {}
          }
        >
          {title}
        </MaterialLink>
      </Box>
    );
  };

  let links = null;
  if (role === "user") {
    links = (
      <div style={{ display: "flex", alignItems: "center" }}>
        {CustomNavItem("/parkings", "Parkings")}
        {CustomNavItem("/user/bookings", "Bookings")}
        {CustomNavItem("/user/me", "Profile")}
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
      </div>
    );
  } else if (role === "owner") {
    links = (
      <div style={{ display: "flex", alignItems: "center" }}>
        {CustomNavItem("/parkings", "Home")}
        {CustomNavItem("/owner/parkings", "Parkings")}
        {CustomNavItem("/owner/me", "Profile")}
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
      </div>
    );
  } else {
    links = (
      <>
        {CustomNavItem("/signin", "Sign In")}
        {CustomNavItem("/user/signup", "User Sign Up")}
        {CustomNavItem("/owner/signup", "Owner Sign Up")}
      </>
    );
  }

  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Typography
          component={NavLink}
          to="/"
          color="inherit"
          variant="h4"
          sx={{
            cursor: "pointer",
            m: 1,
            textDecoration: "none",
          }}
        >
          Smart Parking
        </Typography>
        {isMobile ? <DrawerComponent /> : <>{links}</>}
      </Toolbar>
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
