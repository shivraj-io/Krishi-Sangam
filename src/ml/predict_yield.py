import sys
import json
import joblib
import numpy as np
import os
import warnings

# Suppress sklearn warnings
warnings.filterwarnings("ignore")

MODEL_PATH = os.path.join(os.path.dirname(__file__), "yield_model.pkl")
SCALER_PATH = os.path.join(os.path.dirname(__file__), "yield_scaler.pkl")

# Read input JSON from Node.js
input_str = sys.stdin.read()
data = json.loads(input_str)

# Encode categorical variables (simple label encoding)
state_map = {"Madhya Pradesh": 0, "Maharashtra": 1, "Karnataka": 2, "Uttar Pradesh": 3, "Punjab": 4}
season_map = {"Kharif": 0, "Rabi": 1, "Zaid": 2}
crop_map = {"Rice": 0, "Wheat": 1, "Soybean": 2, "Maize": 3, "Cotton": 4, "Sugarcane": 5}

state = state_map.get(data["State"], 0)
season = season_map.get(data["Season"], 0)
crop = crop_map.get(data["Crop"], 0)

features = np.array([[
    state,
    data["Year"],
    season,
    crop,
    data["Area"],
    data["Rainfall"]
]])

try:
    # Load model and scaler if available
    if os.path.exists(MODEL_PATH):
        model = joblib.load(MODEL_PATH)
        
        # Use scaler if available
        if os.path.exists(SCALER_PATH):
            scaler = joblib.load(SCALER_PATH)
            features_scaled = scaler.transform(features)
            prediction = model.predict(features_scaled)[0]
        else:
            prediction = model.predict(features)[0]
        
        print(json.dumps({
            "predicted_yield": round(float(prediction), 2),
            "model_used": "Random_Forest_ML_Model",
            "unit": "tons_per_hectare"
        }))
    else:
        # Fallback rule-based calculation
        # Simple formula: Area × Rainfall factor × Crop factor
        crop_factors = {"Rice": 2.5, "Wheat": 3.0, "Soybean": 1.8, "Maize": 4.0, "Cotton": 1.5, "Sugarcane": 60}
        crop_name = data.get("Crop", "Rice")
        crop_factor = crop_factors.get(crop_name, 2.0)
        
        rainfall_factor = min(data["Rainfall"] / 100, 2.0)  # Max factor of 2 for very high rainfall
        base_yield = (data["Area"] * crop_factor * rainfall_factor) / 10  # Normalize
        
        print(json.dumps({
            "predicted_yield": round(base_yield, 2),
            "model_used": "Rule_Based_Fallback",
            "unit": "tons_per_hectare",
            "note": "ML model not available, using rule-based prediction"
        }))
        
except Exception as e:
    print(json.dumps({
        "error": f"Prediction failed: {str(e)}",
        "predicted_yield": 0,
        "model_used": "Error_Fallback"
    }))
