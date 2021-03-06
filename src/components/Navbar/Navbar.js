import React, { useState } from "react";
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

// components
import ConfirmDialog from "../../components/ConfirmDialog";

// actions
import { signOut } from "../../redux/actions/authAction";
import { setAlert } from "../../redux/actions/alertAction";

const Navbar = ({ role, signOut, setAlert }) => {
  const [open, setOpen] = useState(false);
  const isMobile = useMedia("(max-width: 720px)");
  const Navigate = useNavigate();
  const handleSignOut = () => {
    signOut().then((data) => {
      if (data.type === "SIGNOUT") {
        setOpen(false);
        setAlert("success", "sign out success");
        Navigate("/");
      }
    });
  };

  const CustomNavItem = (path, title) => {
    return (
      <Box sx={{ m: 1 }}>
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
            onClick={() => setOpen(true)}
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
            onClick={() => setOpen(true)}
          >
            Sign Out
          </Button>
        </Box>
      </div>
    );
  } else {
    links = (
      <div style={{ display: "flex", alignItems: "center" }}>
        {CustomNavItem("/signin", "Sign In")}
        {CustomNavItem("/user/signup", "User Sign Up")}
        {CustomNavItem("/owner/signup", "Owner Sign Up")}
      </div>
    );
  }

  return (
    <>
      <div style={{ paddingTop: 64 }}>
        <AppBar position="fixed">
          <Toolbar
            sx={{
              justifyContent: "space-between",
            }}
          >
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {isMobile && <DrawerComponent />}
              <Typography
                component={NavLink}
                to="/"
                color="inherit"
                sx={{
                  cursor: "pointer",
                  m: 1,
                  textDecoration: "none",
                }}
              >
                Smart Parking
              </Typography>
            </Box>
            {!isMobile && <>{links}</>}
          </Toolbar>
        </AppBar>
      </div>
      {open && (
        <ConfirmDialog
          open={open}
          setOpen={setOpen}
          title="Sign Out"
          content="Do you really wish to leave and sign out ?"
          yes="Yes, Sign Out"
          no="No, Cancel"
          onConfirm={handleSignOut}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  role: state.auth.role,
});

export default connect(mapStateToProps, {
  signOut,
  setAlert,
})(Navbar);
