import React from "react";
import { connect } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

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

  const Nav = (path, title) => {
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
      <>
        {Nav("/parkings", "Parkings")}
        {Nav("/user/bookings", "Bookings")}
        {Nav("/user/me", "Profile")}
      </>
    );
  } else if (role === "owner") {
    links = (
      <>
        {Nav("/parkings", "Home")}
        {Nav("/owner/parkings", "Parkings")}
        {Nav("/owner/me", "Profile")}
      </>
    );
  } else {
    links = (
      <>
        {Nav("/signin", "Sign In")}
        {Nav("/user/signup", "User Sign Up")}
        {Nav("/owner/signup", "Owner Sign Up")}
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
            component={NavLink}
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
