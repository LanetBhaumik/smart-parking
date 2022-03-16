import React from "react";

import { Route, Routes, Navigate } from "react-router-dom";

//pages
import Navbar from "./components/Navbar/Navbar";
import Parkings from "./pages/Parkings/Parkings";
import SignIn from "./pages/SignIn/SignIn";
import UserSignUp from "./pages/user/UserSignUp";
import OwnerSignUp from "./pages/owner/OwnerSignUp";
import UserBookings from "./pages/user/UserBookings";
import UserProfile from "./pages/user/UserProfile";
import OwnerParkings from "./pages/owner/OwnerParkings";
import Parking from "./pages/owner/parking";
import OwnerProfile from "./pages/owner/OwnerProfile";
import NotFound from "./pages/NotFound";

//material ui
// import { Alert } from "@mui/material";
import { useSelector } from "react-redux";

const App = () => {
  const { role } = useSelector((state) => state.auth);
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <br />
      {/* {alert.alert && (
        <Alert severity={alert.severity} style={{ marginTop: "50px" }}>
          {alert.message}
        </Alert>
      )} */}
      <br />
      <main>
        <Routes>
          <Route path="/">
            <Route index element={<Parkings />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="user/signup" element={<UserSignUp />} />
            <Route path="owner/signup" element={<OwnerSignUp />} />
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
                <Route path=":parkingId" element={<Parking />} />
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
      </main>
    </div>
  );
};

export default App;
