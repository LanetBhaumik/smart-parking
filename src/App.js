import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";

import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/UserSignUp";
import NotFound from "./pages/NotFound";
import UserDashboard from "./pages/UserDashboard";
import Parkings from "./pages/Parkings";

// import Unauthorized from './pages/Unauthorized'

import Header from "./components/Navbar/Navbar";
import UserBookings from "./pages/UserBookings";
import ParkingBookings from "./pages/ParkingBookings";

import OwnerSignUp from "./pages/SignUp/OwnerSignUp";
import UserSignUp from "./pages/SignUp/UserSignUp";

//material ui
import { Alert } from "@mui/material";

const App = () => {
  const alert = useSelector((state) => state.alert);
  return (
    <>
      <Header />
      {alert && <Alert severity={alert.severity}>{alert.message}</Alert>}
      <Routes>
        <Route path="/" element={<SignIn />}>
          <Route path="/parkings" element={<Parkings />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
        </Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/user" element={<SignIn />}>
          <Route path="user/dashboard" element={<UserDashboard />}></Route>
          <Route path="user/bookings" element={<UserBookings />}></Route>
        </Route>
        <Route>
          <Route path="/parkingBookings" element={<ParkingBookings />}></Route>
        </Route>

        <Route path="/owner/signup" element={<OwnerSignUp />}></Route>
        <Route path="/user/signup" element={<UserSignUp />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
};

export default App;
