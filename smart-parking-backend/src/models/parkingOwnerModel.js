const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const parkingOwnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    mobile_no: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isMobilePhone(value, ["en-IN"])) {
          throw new Error("Mobile No is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: [7, "password must be 7 or more characters"],
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("password field must not contains word 'password'.");
        }
      },
    },
    parkings: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Parking",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

parkingOwnerSchema.methods.generateAuthToken = async function () {
  const parkingOwner = this;
  const token = jwt.sign(
    { _id: parkingOwner._id.toString() },
    process.env.JWT_SECRET
  );
  await parkingOwner.save();
  return token;
};

parkingOwnerSchema.methods.toJSON = function () {
  const parkingOwner = this;
  const parkingOwnerObject = parkingOwner.toObject();
  delete parkingOwnerObject.password;
  return parkingOwnerObject;
};

parkingOwnerSchema.statics.findByCredentials = async (email, password) => {
  const parkingOwner = await ParkingOwner.findOne({ email });
  if (!parkingOwner) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(password, parkingOwner.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return owner;
};

//Hash the plain text password before saving
parkingOwnerSchema.pre("save", async function (next) {
  const parkingOwner = this; //'this' is a document that is going to be save.

  if (parkingOwner.isModified("password")) {
    parkingOwner.password = await bcrypt.hash(parkingOwner.password, 8);
  }

  next(); // it runs after function runs
});

//Delete parkings of parkingowner when owner delete accout
parkingOwnerSchema.pre("remove", async function (next) {
  const parkingOwner = this;
  await Parking.deleteMany({
    owner: parkingOwner._id,
  });

  next();
});

const ParkingOwner = mongoose.model("ParkingOwner", parkingOwnerSchema);

module.exports = ParkingOwner;
