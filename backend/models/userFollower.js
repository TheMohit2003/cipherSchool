const mongoose = require("mongoose");

const followerSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  followers: {
    type: [Number],
  },
});

const follower = new mongoose.model("follower", followerSchema);

module.exports = follower;
