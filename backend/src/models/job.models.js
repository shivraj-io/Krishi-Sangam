const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  wage: {
    type: Number,
    required: true
  },
  location: {
    village: String,
    district: String,
    state: String
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ["open", "in-progress", "completed"],
    default: "open"
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // job farmer ne banaya hoga
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"   // job kisi labour ko assign hoga
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Job", jobSchema);
