import React from "react";

import { Route, Routes, Navigate } from "react-router-dom";

//pages
import Navbar from "./components/Navbar";
import Parkings from "./pages/Parkings/Parkings";
import SignIn from "./pages/SignIn/SignIn";
import UserSignUp from "./pages/user/UserSignUp";
import OwnerSignUp from "./pages/owner/OwnerSignUp";
import UserBookings from "./pages/user/UserBookings";
import UserProfile from "./pages/user/UserProfile";
import OwnerParkings from "./pages/Parkings/OwnerParkings";
import OwnerProfile from "./pages/owner/OwnerProfile";
import NotFound from "./pages/NotFound";

//material ui
// import { Alert } from "@mui/material";
import { useSelector } from "react-redux";
import OwnerParkingSlots from "./pages/owner/OwnerParkingSlots";
import ParkingSlots from "./pages/Parkings/ParkingSlots";
import SlotBookings from "./components/SlotBookings";
import Homepage from "./pages/Homepage";

const App = () => {
  const { role } = useSelector((state) => state.auth);
  return (
    <>
      <Navbar />
      {/* {alert.alert && (
        <Alert severity={alert.severity} style={{ marginTop: "50px" }}>
          {alert.message}
        </Alert>
      )} */}
      {/* <br />
      <br />
      <br /> */}
      <div style={{ "margin-top": "4rem" }}>
        <Routes>
          <Route path="/">
            <Route index element={<Homepage />} />
            <Route path="parkings" element={<Parkings />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="user/signup" element={<UserSignUp />} />
            <Route path="owner/signup" element={<OwnerSignUp />} />
            <Route path="parkings/:parkingId" element={<ParkingSlots />} />
          </Route>

          {role === "user" && (
            <Route path="user">
              <Route path="bookings" element={<UserBookings />} />
              <Route path="me" element={<UserProfile />} />
            </Route>
          )}

          {role === "owner" && (
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
      </div>
    </>
  );
};

export default App;
