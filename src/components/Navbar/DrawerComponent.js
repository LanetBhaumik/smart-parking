import React, { useState } from "react";
import { connect } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

// material ui
import MenuIcon from "@mui/icons-material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Box,
  Button,
  SwipeableDrawer,
  ListItem,
  ListItemText,
  List,
  IconButton,
} from "@mui/material";

// actions
import { signOut } from "../../redux/actions/authAction";
import { setAlert } from "../../redux/actions/alertAction";
import ConfirmDialog from "../ConfirmDialog";

const DrawerComponent = ({ role, signOut, setAlert }) => {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const Navigate = useNavigate();

  const toggleDrawer = (value) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(value);
  };

  const handleSignOut = () => {
    signOut().then((data) => {
      if (data.type === "SIGNOUT") {
        setAlert("success", "sign out success");
        Navigate("/");
      }
    });
  };

  const CustomListItem = (path, title) => {
    return (
      <ListItem button component={NavLink} to={path}>
        <ListItemText primary={title} />
      </ListItem>
    );
  };

  let list = null;
  if (role === "user") {
    list = (
      <>
        {CustomListItem("/parkings", "Parkings")}
        {CustomListItem("/user/bookings", "Bookings")}
        {CustomListItem("/user/me", "Profile")}
        <Box sx={{ m: 1, textAlign: "center" }}>
          <Button
            variant="outlined"
            color="inherit"
            sx={{ fontWeight: "bold" }}
            onClick={() => setDialogOpen(true)}
          >
            Sign Out
          </Button>
        </Box>
      </>
    );
  } else if (role === "owner") {
    list = (
      <>
        {CustomListItem("/parkings", "Home")}
        {CustomListItem("/owner/parkings", "Parkings")}
        {CustomListItem("/owner/me", "Profile")}
        <Box sx={{ m: 1, textAlign: "center" }}>
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
    list = (
      <>
        {CustomListItem("/signin", "Sign In")}
        {CustomListItem("/user/signup", "User Sign Up")}
        {CustomListItem("/owner/signup", "Owner Sign Up")}
      </>
    );
  }

  return (
    <>
      <MenuIcon
        onClick={toggleDrawer(true)}
        sx={{
          cursor: "pointer",
        }}
      />
      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box sx={{ textAlign: "right", m: 1 }}>
            <IconButton onClick={toggleDrawer(false)}>
              <CancelIcon />
            </IconButton>
          </Box>
          <List>{list}</List>
        </Box>
      </SwipeableDrawer>
      {dialogOpen && (
        <ConfirmDialog
          open={dialogOpen}
          setOpen={setDialogOpen}
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
})(DrawerComponent);
