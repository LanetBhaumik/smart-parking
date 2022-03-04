const mongoose = require("mongoose");
const Booking = require("./BookingModel");

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
      type: Number,
      required: true,
      validate(value) {
        if (value < 1) {
          throw new Error("rate must be greater than zero.");
        }
      },
    },
    pincode: {
      type: String,
      required: [true, "Why no pincode?"],
      validate(value) {
        return /[1-9][0-9]{5}/.test(value);
      },
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

parkingSchema.methods.toJSON = function () {
  const parking = this;
  const parkingObject = parking.toObject();
  delete parkingObject.createdAt;
  delete parkingObject.updatedAt;
  delete parkingObject.__v;
  return parkingObject;
};

parkingSchema.pre("remove", async function (next) {
  const parking = this;
  await Booking.deleteMany({
    parking: parking._id,
  });

  next();
});

const Parking = mongoose.model("Parking", parkingSchema);

module.exports = Parking;
