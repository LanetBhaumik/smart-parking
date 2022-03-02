const User = require("../models/userModel");
const sharp = require("sharp");
const multer = require("multer");
// const { sendWelcomeEmail, sendCancelationEmail } = require("../emails/account");
// import { v1 as uuidv1 } from "uuid";

// uuidv1();

const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    // sendWelcomeEmail(user.email, user.name);
    const token = await user.generateAuthToken();
    res.status(201).send({ user: user, token });
  } catch (error) {
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

const loginUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
};

const userProfile = async (req, res) => {
  res.send(req.user);
};

const updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedupdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) => {
    return allowedupdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }
  try {
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    await req.user.remove();
    // sendCancelationEmail(req.user.email, req.user.name);
    res.send(req.user);
  } catch (error) {
    res.status(500).send(e);
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
  req.user.avatar = buffer;
  await req.user.save();
  res.send();
};

const deleteAvatar = async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
};

const getAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error();
    }
    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  createUser,
  loginUser,
  userProfile,
  updateUser,
  deleteUser,
  uploadAvatar,
  deleteAvatar,
  upload,
  getAvatar,
};
