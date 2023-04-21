const express = require("express");
const router = express.Router();

//route to register user .

router.post("/login", (req, res) => {
  res.send("this is the post route on login");
});
//route to logging the user .

router.post("/register", (req, res) => {
  res.send("this is the post route on register");
});

//route to updating the profile details

router.put("/updateProfile", (req, res) => {
  res.send("this is the PUT route to update user details");
});

//route to update the password

router.put("/updatePassword", (req, res) => {
  res.send("this is the password upated route");
});

//route to update the user interests
router.put("/updateInterests", (req, res) => {
  res.send("this is the route for updating user interests");
});
//route to get the follower details .

router.get("/followers", (req, res) => {
  res.send("this is the route for getting user's followers data");
});

module.exports = router;
