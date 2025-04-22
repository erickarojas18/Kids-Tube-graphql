const mongoose = require("mongoose");

const RestrictedUserSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

module.exports = mongoose.model("RestrictedUser", RestrictedUserSchema);
