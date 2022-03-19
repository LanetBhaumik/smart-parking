const { default: mongoose } = require("mongoose");
const { findById, findOne } = require("../models/bookingModel");
const Booking = require("../models/bookingModel");
const ParkingBooking = require("../models/parkingBookingModal");
const Parking = require("../models/parkingModel");

// New booking
const createBooking = async (req, res) => {
  try {
    const bookingId = new mongoose.Types.ObjectId();
    const parking = await Parking.findById(req.body.parking);
    if (!parking) {
      throw new Error("parking is not valid");
    }
    const booking = new Booking({
      _id: bookingId,
      user: req.user._id,
      car: req.user.car,
      ...req.body,
    });
    await booking.save();

    const parkingBooking = await ParkingBooking.findOne({
      parking: booking.parking,
      slot: booking.slot,
    });
    console.log(parkingBooking);
    await parkingBooking.bookings.push(bookingId);
    console.log("before", parkingBooking.bookings);
    await parkingBooking.save();
    console.log("before", parkingBooking.bookings);

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

    const parkingBooking = await ParkingBooking.find({
      parking: booking.parking,
      slot: booking.slot,
    });
    const newBookigs = parkingBooking.bookings.filter(
      (id) => id != booking._id
    );
    parkingBooking.bookings = newBookigs;
    await parkingBooking.save();

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
    })
      .select("-user")
      .sort({ in_time: -1 })
      .populate({
        path: "car",
        select: "car_no",
      })
      .populate({
        path: "parking",
        select: "parking_name",
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
    const parkingBooking = await ParkingBooking.find({
      parking: req.params.parkingId,
    })
      .select("-parking")
      .populate({
        path: "bookings",
        select: "in_time out_time",
      });
    if (parkingBooking.length == 0) {
      return res.status(404).send({
        error: "parking not found",
      });
    }
    res.send(parkingBooking);
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
