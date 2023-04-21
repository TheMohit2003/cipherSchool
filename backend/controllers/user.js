/* eslint-env node */
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SALT = process.env.SALT;

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    // Create a new user object and hash the password
    user = new User({ email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // Sign a JWT and send it to the client
    const payload = { user: { id: user.id } };
    const token = await jwt.sign(payload, SALT, { expiresIn: 3600 });
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user and verify their password
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Sign a JWT and send it to the client
    const payload = { user: { id: user.id } };
    const token = await jwt.sign(payload, SALT, { expiresIn: 3600 });
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = { register, login };
