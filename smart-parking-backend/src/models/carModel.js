const mongoose = require("mongoose");
const validator = require("validator");

const carSchema = new mongoose.Schema(
  {
    model: {
      type: String,
      required: true,
      trim: true,
    },
    number_plate: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isLicensePlate(value, ["en-IN"])) {
          throw new Error("number plate is invalid");
        }
      },
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
