const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    max: 255,
    min: 3,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 8,
  },
});

module.exports = mongoose.model("User", userSchema);
