const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema({
  fullName: String,
  mobile: { type: String, required: true, unique: true },
  village: String,
  district: String,
  state: String,
  NPK: {
    N: Number,
    P: Number,
    K: Number
  }
});

module.exports = mongoose.model("Farmer", farmerSchema);
