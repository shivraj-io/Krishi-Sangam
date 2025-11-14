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
  type: {
    type: String,
    default: "General"
  },
  cropType: {
    type: String
  },
  duration: {
    type: String,
    default: "1 day"
  },
  workersNeeded: {
    type: Number,
    default: 1
  },
  wage: {
    type: Number,
    required: true
  },
  requirements: {
    type: String
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
    ref: "User",
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  labourRequests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  applications: [{
    labour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    appliedAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Job", jobSchema);
