/* eslint-env node */
const express = require("express");
const router = express.Router();
const {
  login,
  register,
  updateProfile,
  updatePassword,
  updateInterest,
  getFollowers,
} = require("../controllers/user");

/**
 * @description Route to register a user
 * @route POST /api/user/register
 */
router.post("/register", register);

/**
 * @description Route to log in a user
 * @route POST /api/user/login
 */
router.post("/login", login);

/**
 * @description Route to update user profile details
 * @route PUT /api/user/updateProfile
 */
router.put("/:id/updateProfile", updateProfile);

/**
 * @description Route to update user password
 * @route PUT /api/user/updatePassword
 */
router.put("/:id/updatePassword", updatePassword);

/**
 * @description Route to update user interests
 * @route PUT /api/user/updateInterests
 */
router.put("/:id/updateInterests", updateInterest);

/**
 * @description Route to get user's follower details
 * @route GET /api/user/followers
 */
router.get("/:id/followers", getFollowers);

module.exports = router;
