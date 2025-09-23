const Farmer = require("../models/Farmer");
const { PythonShell } = require("python-shell");
const axios = require("axios");

// POST /api/crop/predict
exports.predictCrop = async (req, res) => {
  try {
    const { mobile } = req.body;
    if (!mobile) return res.status(400).json({ message: "Mobile required" });

    // Lookup farmer for location (village/district/state)
    const farmer = await Farmer.findOne({ mobile });
    if (!farmer) return res.status(404).json({ message: "Farmer not found" });

    const { village, district, state } = farmer;

    // Fetch NPK from Soil Health Card API / website (mocked here)
    // Example: Replace with actual scraping or official API
    const npkData = await getNPKFromSHC(mobile, village, district, state);

    const { N, P, K } = npkData;

    // Call Python crop prediction model
    const args = [N, P, K];
    PythonShell.run("ml/predict_crop.py", { mode: "text", args }, (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ predictedCrop: result[0], N, P, K });
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mock function to fetch NPK (replace with scraping / API)
async function getNPKFromSHC(mobile, village, district, state) {
  // Example: normally fetch from official soilhealth portal
  // For prototype, returning random values
  return {
    N: 60,
    P: 30,
    K: 40
  };
}
