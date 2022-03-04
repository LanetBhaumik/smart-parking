const express = require("express");
const router = new express.Router();

const {
  addCar,
  makeCarPrimary,
  deleteCar,
} = require("../controllers/carController");
const auth = require("../middleware/userAuth");
const carValidation = require("../middleware/carValidation");

// Add New Car
router.post("/user/cars", auth, addCar);

// Set Car As Primary
router.post("/user/primary_car", auth, carValidation, makeCarPrimary);

// Delete Car
router.post("/user/delete_car", auth, carValidation, deleteCar);

module.exports = router;
