import React from "react";

import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

//pages
import Navbar from "./components/Navbar/Navbar";
import Parkings from "./pages/Parkings/Parkings";
import SignIn from "./pages/SignIn/SignIn";
import UserSignUp from "./pages/SignUp/UserSignUp";
import OwnerSignUp from "./pages/SignUp/OwnerSignUp";
import NotFound from "./pages/NotFound";
import UserBookings from "./pages/UserBookings";
import UserProfile from "./pages/UserProfile";

//material ui
import { Alert } from "@mui/material";

const App = () => {
  const { alert } = useSelector((state) => state);
  return (
    <>
      <Navbar />
      {alert.alert && <Alert severity={alert.severity}>{alert.message}</Alert>}
      <Routes>
        <Route path="/" element={<Parkings />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/user/signup" element={<UserSignUp />}></Route>
        <Route path="/owner/signup" element={<OwnerSignUp />}></Route>

        {/* user routes */}
        <Route path="/user/bookings" element={<UserBookings />}></Route>
        <Route path="user/me" element={<UserProfile />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
};

export default App;
