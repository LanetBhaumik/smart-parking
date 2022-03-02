const mongoose = require("mongoose");

const parkingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slots: {
      type: Number,
      required: true,
      default: 10,
      validate(value) {
        if (value < 10) {
          throw new Error("Parking must have 10 or more slots");
        }
      },
    },
    rate: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "Owner",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Parking = mongoose.model("Parking", parkingSchema);

module.exports = Parking;
