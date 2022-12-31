require("dotenv").config();

const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
  // Validate Data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if user exists

  const usernameExist = await User.findOne({ username: req.body.username });
  if (usernameExist) return res.status(400).send("User already exists");

  // Hashing Password

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // Create new User
  const user = new User({
    username: req.body.username,
    password: hashPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  // Validate Data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if user exists
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("username is not found");

  //Checking password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Incorrect password");

  // Create token

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN);
  res.header("user-token", token).send(token);

  // res.send("Login successful!");
});

// router.post("/login", (req, res) => {});

module.exports = router;
