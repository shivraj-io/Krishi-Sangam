const express = require("express");
const {
  createJob,
  getJobs,
  assignJob,
  completeJob,
  applyJob
} = require("../controllers/jobController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

const router = express.Router();

// Get all jobs
router.get("/", protect, getJobs);

// Create job (Farmer only)
router.post("/create", protect, authorizeRoles("farmer"), createJob);

// Assign job to labour (Farmer only)
router.put("/:id/assign", protect, authorizeRoles("farmer"), assignJob);

// Labour applies/request (Labour only)
router.post('/:id/apply', protect, authorizeRoles("labour"), applyJob);


// Labour completes job
router.put("/complete", protect, authorizeRoles("labour"), completeJob);

module.exports = router;
