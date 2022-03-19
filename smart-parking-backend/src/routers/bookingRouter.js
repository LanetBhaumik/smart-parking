const express = require("express");
const {
  createBooking,
  userBookings,
  parkingBookings,
  deleteBooking,
} = require("../controllers/bookingController");
const router = new express.Router();

const userAuth = require("../middleware/userAuth");
const ownerAuth = require("../middleware/ownerAuth");

// New booking
router.post("/bookings", userAuth, createBooking);

// Delete booking
router.delete("/bookings/:bookingId", userAuth, deleteBooking);

// Get all bookings of user
router.get("/bookings/me", userAuth, userBookings);

//Get all bookings of parking
router.get("/bookings/:parkingId", parkingBookings);

module.exports = router;
