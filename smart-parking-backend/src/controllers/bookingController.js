const { findById, findOne } = require("../models/bookingModel");
const Booking = require("../models/bookingModel");
const Parking = require("../models/parkingModel");

// New booking
const createBooking = async (req, res) => {
  try {
    const parking = await Parking.findById(req.body.parking);
    if (!parking) {
      throw new Error("parking is not valid");
    }
    const booking = new Booking({
      user: req.user._id,
      car: req.user.car,
      ...req.body,
    });
    await booking.save();
    res.send(booking);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error.message,
    });
  }
};

// Delete booking
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.booking_id,
      user: req.user._id,
    });
    if (!booking) {
      throw new Error("Booking not found or you do not have permission.");
    }
    await booking.remove();
    res.send(booking);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error.message,
    });
  }
};

// Get all bookings of user
const userBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user._id,
    });
    if (bookings.length == 0) {
      return res.send({
        success: "you do not have any bookings",
      });
    }
    res.send(bookings);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error.message,
    });
  }
};

//Get all bookings of parking
const parkingBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      parking: req.params.parking_id,
    });
    if (bookings.length == 0) {
      return res.send({
        success: "this parking do not have any bookings",
      });
    }
    res.send(bookings);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error.message,
    });
  }
};

module.exports = {
  createBooking,
  userBookings,
  parkingBookings,
  deleteBooking,
};
