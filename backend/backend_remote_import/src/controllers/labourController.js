// backend/controllers/labourController.js
const { spawn } = require("child_process");
const path = require("path");

const modelPath = path.join(__dirname, "../ml/labour_model.joblib");

const predictLabour = (req, res) => {
    const inputData = req.body; // Expect JSON array of feature objects

    // Check if model file exists
    const fs = require('fs');
    if (!fs.existsSync(modelPath)) {
        console.error("Model file not found:", modelPath);
        return res.status(500).json({ 
            error: "Labour prediction model not found", 
            message: "Please train the labour model first by running the training script",
            modelPath: modelPath
        });
    }

    const py = spawn("python", [
        "-c",
        `
import sys
import os
sys.path.append('${path.dirname(modelPath).replace(/\\/g,"/")}')

import joblib
import pandas as pd
import numpy as np
import json
from labour_recommender import LabourRecommender

try:
    # Load the trained model
    model_path = "${modelPath.replace(/\\/g,"/")}"
    
    if not os.path.exists(model_path):
        print(json.dumps({"error": "Model file not found"}), file=sys.stderr)
        sys.exit(1)
    
    # Load model
    model = joblib.load(model_path)
    
    # Read input data
    input_data = json.loads(sys.stdin.read())
    
    # Make prediction using the model's predict method
    predictions = model.predict(input_data)
    
    # Output as JSON
    print(json.dumps(predictions))
    
except Exception as e:
    print(json.dumps({"error": str(e)}), file=sys.stderr)
    sys.exit(1)
        `
    ]);

    py.stdin.write(JSON.stringify(inputData));
    py.stdin.end();

    let output = "";
    let errorOutput = "";
    
    py.stdout.on("data", (data) => {
        output += data.toString();
    });

    py.stderr.on("data", (data) => {
        errorOutput += data.toString();
    });

    py.on("close", (code) => {
        if (code !== 0) {
            console.error("Python script error:", errorOutput);
            return res.status(500).json({ 
                error: "Python script execution failed", 
                details: errorOutput 
            });
        }
        
        // Log any warnings from stderr but don't fail the request
        if (errorOutput.trim()) {
            console.warn("Python script warnings:", errorOutput);
        }
        
        if (!output.trim()) {
            console.error("Empty output from Python script");
            return res.status(500).json({ 
                error: "No output received from Python script" 
            });
        }

        try {
            const result = JSON.parse(output.trim());
            
            // Add warning to response if there were any warnings
            if (errorOutput.trim()) {
                try {
                    const warningData = JSON.parse(errorOutput.trim());
                    result.warning = warningData.warning;
                } catch (parseWarningError) {
                    result.warning = "Model loading had issues, using fallback";
                }
            }
            
            res.json(result);
        } catch (parseError) {
            console.error("JSON parse error:", parseError);
            console.error("Raw output:", output);
            return res.status(500).json({ 
                error: "Failed to parse prediction results", 
                details: parseError.message,
                rawOutput: output
            });
        }
    });
};

module.exports = { predictLabour };
