const multer = require("multer");
const Owner = require("../models/ownerModel");
const Parking = require("../models/parkingModel");
const mongoose = require("mongoose");

const createOwner = async (req, res) => {
  try {
    const owner_id = new mongoose.Types.ObjectId();
    const parking_id = new mongoose.Types.ObjectId();

    const parking = new Parking({
      _id: parking_id,
      ...req.body.parking,
      owner: owner_id,
      booked_slots: 0,
      available_slots: req.body.parking.total_slots,
    });
    const owner = new Owner({
      _id: owner_id,
      ...req.body,
      parkings: [parking_id],
    });
    await parking.save();
    await owner.save();
    const token = await owner.generateAuthToken();
    res.status(201).send({ owner, parking, token });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      const keys = Object.keys(error.keyValue);
      return res.status(400).send({
        error: `This ${keys[0]} is already being used`,
      });
    }
    res.status(400).send({
      error: error.message,
    });
  }
};

const loginOwner = async (req, res) => {
  try {
    const owner = await Owner.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await owner.generateAuthToken();
    res.send({ owner, token });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
};

const ownerProfile = async (req, res) => {
  res.send(req.owner);
};

const updateOwner = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedupdates = ["name", "password"];
    const isValidOperation = updates.every((update) => {
      return allowedupdates.includes(update);
    });

    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid updates" });
    }
    updates.forEach((update) => {
      req.owner[update] = req.body[update];
    });
    await req.owner.save();
    res.send(req.owner);
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
};

const deleteOwner = async (req, res) => {
  try {
    await req.owner.remove();
    // sendCancelationEmail(req.user.email, req.user.name);
    res.send(req.owner);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error.message,
    });
  }
};

const upload = multer({
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpef|png)$/)) {
      return cb(new Error("Please upload an image"));
    }
    cb(undefined, true);
  },
  limits: {
    fileSize: 1000000,
  },
});

const uploadAvatar = async (req, res) => {
  const buffer = await sharp(req.file.buffer)
    .resize({ width: 250, height: 250 })
    .png()
    .toBuffer();
  req.owner.avatar = buffer;
  await req.owner.save();
  res.send();
};

const deleteAvatar = async (req, res) => {
  req.owner.avatar = undefined;
  await req.owner.save();
  res.send();
};

const getAvatar = async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.id);
    if (!owner || !owner.avatar) {
      throw new Error();
    }
    res.set("Content-Type", "image/png");
    res.send(owner.avatar);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

module.exports = {
  createOwner,
  loginOwner,
  ownerProfile,
  updateOwner,
  deleteOwner,
  uploadAvatar,
  deleteAvatar,
  upload,
  getAvatar,
};
