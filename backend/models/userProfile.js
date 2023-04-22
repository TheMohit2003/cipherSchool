const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  about: {
    type: String,
  },
  links: {
    linkedin: {
      type: String,
    },
    github: {
      type: String,
    },
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
    instagram: {
      type: String,
    },
    website: {
      type: String,
    },
  },
  professionalInfo: {
    highestGraduation: {
      type: Number,
      enum: [0, 1, 2, 3, 4],
      default: 0,
    },
    currentStatus: {
      type: Number,
      enum: [0, 1, 2, 3, 4],
      default: 0,
    },
  },
  interests: {
    type: [Number],
    enum: [0, 1, 2, 3, 4, 5, 6, 7],
    default: [],
  },
});

module.exports = mongoose.model("Profile", profileSchema);
