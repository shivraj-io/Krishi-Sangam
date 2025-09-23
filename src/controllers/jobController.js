const Job = require("../models/job.model");

// Create Job (Farmer)
const createJob = async (req, res) => {
  try {
    const { title, description, wage, location, date } = req.body;
    const job = await Job.create({
      title,
      description,
      wage,
      location,
      date,
      createdBy: req.user._id,
      createdByName: req.user.fullName
    });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Jobs (All users)
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("createdBy", "fullName email")
      .populate("assignedTo", "fullName email");
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assign Job to Labour (Farmer)
const assignJob = async (req, res) => {
  try {
    const jobId = req.params.id;          // URL param
    const { labourId } = req.body;        // body

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    job.assignedTo = labourId;
    job.status = "in-progress";
    await job.save();

    res.json({ message: "Job assigned successfully", job });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// Labour applies/request for a job
const applyJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (job.assignedLabour) {
      return res.status(400).json({ message: 'Labour already assigned' });
    }

    const labourSkills = req.user.skills || [];
    const jobRequiredSkills = job.requiredSkills || [];
    
    // Only check skills if job has required skills
    if (jobRequiredSkills.length > 0) {
      const matched = jobRequiredSkills.every(skill => labourSkills.includes(skill));
      if (!matched) {
        return res.status(400).json({ message: "Your skills don't match the job requirements" });
      }
    }

    // Initialize labourRequests array if it doesn't exist
    if (!job.labourRequests) {
      job.labourRequests = [];
    }

    if (!job.labourRequests.includes(req.user._id)) {
      job.labourRequests.push(req.user._id);
      await job.save();
    }

    res.status(200).json({ message: 'You have requested for this job' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



// Labour completes job
const completeJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Optionally ensure only the assigned labour or an admin can complete
    job.status = "completed";
    await job.save();

    res.json({ message: "Job completed successfully", job });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createJob,
  getJobs,
  assignJob,
  completeJob,
  applyJob
};
