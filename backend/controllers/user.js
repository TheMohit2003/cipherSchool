/* eslint-env node */
const User = require("../models/userModel");
const Profile = require("../models/userProfile");
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



const updateProfile = async (req, res) => {
  try {
    // Get the user ID from the request object
    const userId = req.params.id;

    // Find the profile for the given user
    let profile = await Profile.findOne({ user: userId });

    // If the profile doesn't exist, create a new one
    if (!profile) {
      profile = new Profile({
        user: userId,
      });
    }

    // Update the profile with the values from the request body
    if (req.body.about) {
      profile.about = req.body.about;
    }
    if (req.body.links) {
      profile.links = req.body.links;
    }
    if (req.body.professionalInfo) {
      profile.professionalInfo = req.body.professionalInfo;
    }
    if (req.body.interests) {
      profile.interests = req.body.interests;
    }

    // Save the updated profile to the database
    await profile.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating profile",
      error: error.message,
    });
  }
};

module.exports = { register, login,updateProfile };
