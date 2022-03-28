import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import SlotBookings from "./components/SlotBookings";

//pages
import Parkings from "./pages/Parkings/Parkings";
import SignIn from "./pages/SignIn/SignIn";
import UserSignUp from "./pages/user/UserSignUp";
import OwnerSignUp from "./pages/owner/OwnerSignUp";
import UserBookings from "./pages/user/UserBookings";
import UserProfile from "./pages/user/UserProfile";
import OwnerParkings from "./pages/Parkings/OwnerParkings";
import OwnerProfile from "./pages/owner/OwnerProfile";
import NotFound from "./pages/NotFound";
import OwnerParkingSlots from "./pages/owner/OwnerParkingSlots";
import ParkingSlots from "./pages/Parkings/ParkingSlots";
import Homepage from "./pages/Homepage";

// material ui
import { Alert, Box, CircularProgress, Snackbar } from "@mui/material";

// action
import { getProfile } from "./redux/actions/authAction";
import { resetAlert } from "./redux/actions/alertAction";
import Slide from "@mui/material/Slide";

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

const App = ({ role, alert, resetAlert, getProfile }) => {
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(true);
  const token = localStorage.getItem("token");
  const handleClose = () => resetAlert();

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile();
      if (data) {
        setLoading(false);
      }
    };

    if (!mountedRef.current) return null;
    fetchProfile();

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ marginTop: "4rem" }}>
        {alert.status && (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            TransitionComponent={SlideTransition}
            open={alert.status}
            autoHideDuration={5000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity={alert.severity}
              sx={{ width: "100%" }}
            >
              {alert.message}
            </Alert>
          </Snackbar>
        )}
        {loading && (
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress />
          </Box>
        )}
        {!loading && (
          <Routes>
            <Route path="/">
              <Route index element={<Homepage />} />
              <Route path="parkings" element={<Parkings />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="user/signup" element={<UserSignUp />} />
              <Route path="owner/signup" element={<OwnerSignUp />} />
              <Route path="parkings/:parkingId" element={<ParkingSlots />} />
            </Route>

            {token && role === "user" && (
              <Route path="user">
                <Route path="bookings" element={<UserBookings />} />
                <Route path="me" element={<UserProfile />} />
              </Route>
            )}

            {token && role === "owner" && (
              <Route path="owner">
                <Route path="parkings">
                  <Route index element={<OwnerParkings />} />
                  <Route path=":parkingId">
                    <Route index element={<OwnerParkingSlots />} />
                    <Route path=":slot" element={<SlotBookings />}></Route>
                  </Route>
                </Route>
                <Route path="me" element={<OwnerProfile />} />
              </Route>
            )}
            {!role && (
              <>
                <Route path="user/*" element={<Navigate to="/signin" />} />
                <Route path="owner/*" element={<Navigate to="/signin" />} />
              </>
            )}
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        )}
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  alert: state.alert,
  role: state.auth.role,
});

export default connect(mapStateToProps, { resetAlert, getProfile })(App);
