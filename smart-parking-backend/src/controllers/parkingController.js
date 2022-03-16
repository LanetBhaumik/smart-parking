const Parking = require("../models/parkingModel");
const mongoose = require("mongoose");

const createParking = async (req, res) => {
  try {
    const _id = new mongoose.Types.ObjectId();
    const parking = new Parking({
      _id,
      ...req.body,
      owner: req.owner._id,
    });
    await parking.save();
    await req.owner.parkings.push(_id);
    await req.owner.save();
    await req.owner.populate({
      path: "parkings",
    });
    res.status(201).send(req.owner);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error.message,
    });
  }
};

const readAllParkings = async (req, res) => {
  try {
    const parkings = await Parking.find().populate({
      path: "owner",
      select: "name",
    });

    if (parkings.length === 0) {
      throw new Error("No parking found");
    }
    res.send(parkings);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error.message,
    });
  }
};

const readParking = async (req, res) => {
  try {
    const parking = await Parking.findOne({
      _id: req.params.parking_id,
      owner: req.owner._id,
    });
    if (!parking) {
      throw new Error("parking not found or you do not have permission.");
    }
    res.send(parking);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error.message,
    });
  }
};

const updateParking = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedupdates = ["name", "slots", "rate", "pincode"];
    const isValidOperation = updates.every((update) => {
      return allowedupdates.includes(update);
    });

    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid updates" });
    }

    const parking = await Parking.findOne({
      _id: req.params.parking_id,
      owner: req.owner._id,
    });
    if (!parking) {
      throw new Error("parking not found or you do not have permission");
    }
    updates.forEach((update) => {
      parking[update] = req.body[update];
    });
    await parking.save();
    res.send(parking);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error.message,
    });
  }
};

const deleteParking = async (req, res) => {
  try {
    const parking = await Parking.findOne({
      _id: req.params.parking_id,
      owner: req.owner._id,
    });
    if (!parking) {
      throw new Error("parking not found or you do not have permission");
    }
    await parking.remove();
    res.send(parking);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error.message,
    });
  }
};

module.exports = {
  createParking,
  updateParking,
  readParking,
  deleteParking,
  readAllParkings,
};
