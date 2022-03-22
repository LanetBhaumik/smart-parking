const { default: mongoose } = require("mongoose");
const Booking = require("../models/bookingModel");
const ParkingBooking = require("../models/parkingBookingModal");
const Parking = require("../models/parkingModel");

// New booking
const createBooking = async (req, res) => {
  try {
    const bookingId = new mongoose.Types.ObjectId();
    const slotBooking = await ParkingBooking.findOne({
      parking: req.body.parking,
      slot: req.body.slot,
    }).populate("bookings");
    if (!slotBooking) {
      throw new Error("parking or slot is not valid");
    }

    //logic of time is occupied or not
    const requestedIn = new Date(req.body.in_time);
    const requestedOut = new Date(req.body.out_time);
    const occupied = slotBooking.bookings.some((booking) => {
      const bookedIn = new Date(booking.in_time);
      const bookedOut = new Date(booking.out_time);
      const value =
        (bookedIn < requestedIn && requestedIn <= bookedOut) ||
        (bookedIn < requestedOut && requestedOut <= bookedOut);
      return value;
    });
    if (occupied) {
      return res.status(409).send({
        error: "this time is already booked",
      });
    }

    const booking = new Booking({
      _id: bookingId,
      user: req.user._id,
      car: req.user.car,
      ...req.body,
    });
    await booking.save();
    await slotBooking.bookings.push(bookingId);
    await slotBooking.save();

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
    const parkingBookings = await ParkingBooking.find({
      parking: req.params.parkingId,
    })
      .select("-parking")
      .populate({
        path: "bookings",
        select: "in_time out_time",
      });
    if (parkingBookings.length == 0) {
      return res.status(404).send({
        error: "parking not found",
      });
    }

    const data = {};
    parkingBookings.forEach((parkingBooking) => {
      data[parkingBooking.slot] = parkingBooking.bookings;
    });

    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error.message,
    });
  }
};

//Get all bookings of parking slot
const parkingSlotBookings = async (req, res) => {
  try {
    const parkingBooking = await ParkingBooking.findOne({
      parking: req.params.parkingId,
      slot: req.params.slot,
    }).populate({
      path: "bookings",
      populate: {
        path: "user car",
        select: "name car_no -_id",
      },
      select: "-parking -slot -__v",
    });
    if (parkingBooking.length == 0) {
      return res.status(404).send({
        error: "parking not found",
      });
    }
    res.send(parkingBooking.bookings);
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
  parkingSlotBookings,
};
