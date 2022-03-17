const express = require("express");
const router = new express.Router();

const Auth = require("../middleware/ownerAuth");

const {
  createParking,
  readParking,
  updateParking,
  deleteParking,
  readAllParkings,
} = require("../controllers/parkingController");

// Create Parking
router.post("/owners/parkings", Auth, createParking);

// Read All Parkings
router.get("/parkings", readAllParkings);

// Read Parking
router.get("/parkings/:parking_id", readParking);

// Update Parking
router.patch("/parkings/:parking_id", Auth, updateParking);

// Delete Parking
router.delete("/parkings/:parking_id", Auth, deleteParking);

module.exports = router;
