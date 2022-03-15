import React from "react";

import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

//pages
import Navbar from "./components/Navbar/Navbar";
import Parkings from "./pages/Parkings/Parkings";
import SignIn from "./pages/SignIn/SignIn";
import UserSignUp from "./pages/user/UserSignUp";
import OwnerSignUp from "./pages/owner/OwnerSignUp";
import NotFound from "./pages/NotFound";
import UserBookings from "./pages/user/UserBookings";
import UserProfile from "./pages/user/UserProfile";
import Parking from "./pages/owner/parking";

//material ui
import { Alert } from "@mui/material";
import OwnerParkings from "./pages/owner/OwnerParkings";
import OwnerProfile from "./pages/owner/OwnerProfile";

const App = () => {
  const { alert } = useSelector((state) => state);
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <br />
      {/* {alert.alert &&  */}
      <Alert severity={alert.severity} style={{ marginTop: "50px" }}>
        {alert.message}
      </Alert>
      {/* } */}
      <br />
      <main>
        <Routes>
          <Route path="/" element={<Parkings />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/user/signup" element={<UserSignUp />}></Route>
          <Route path="/owner/signup" element={<OwnerSignUp />}></Route>

          {/* user routes */}
          <Route path="/user/bookings" element={<UserBookings />}></Route>
          <Route path="user/me" element={<UserProfile />}></Route>

          {/* owner routes */}
          <Route path="/owner/parkings" element={<OwnerParkings />} />
          <Route path="owner/me" element={<OwnerProfile />}></Route>
          <Route path="/owner/parkings/:parkingId" element={<Parking />} />

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </main>
    </div>
  );
};

export default App;
