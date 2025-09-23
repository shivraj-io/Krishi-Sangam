import sys
import joblib
import numpy as np

# Load model
model = joblib.load("ml/crop_prediction_model.pkl")

# Input from Node.js
args = sys.argv[1:]
N = float(args[0])
P = float(args[1])
K = float(args[2])

input_data = np.array([[N, P, K]])
prediction = model.predict(input_data)
print(prediction[0])
