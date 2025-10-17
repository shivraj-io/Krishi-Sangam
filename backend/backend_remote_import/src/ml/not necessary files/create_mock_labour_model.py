#!/usr/bin/env python3
"""
Create a mock labour model for testing purposes
"""
import joblib
import pandas as pd
import numpy as np
from sklearn.base import BaseEstimator, ClassifierMixin, RegressorMixin

class MockLabourRecommender:
    """Mock labour recommender that returns reasonable predictions"""
    
    def __init__(self):
        pass
    
    def predict(self, X):
        """
        Mock prediction that returns reasonable labour requirements
        Expected input features might include: Crop, Area, Season, etc.
        """
        if isinstance(X, pd.DataFrame):
            n_samples = len(X)
        else:
            n_samples = 1
            
        # Generate mock predictions
        predictions = []
        for i in range(n_samples):
            # Mock labour required (between 10-100 workers)
            labour_required = np.random.randint(10, 100)
            
            # Mock demand level based on labour required
            if labour_required < 25:
                demand_level = "Very_Low"
            elif labour_required < 50:
                demand_level = "Low"
            elif labour_required < 75:
                demand_level = "Medium"
            else:
                demand_level = "High"
            
            predictions.append({
                "Labour_Required": int(labour_required),
                "Labour_Demand_Level": demand_level
            })
        
        return predictions

# Create and save the mock model
mock_model = MockLabourRecommender()
joblib.dump(mock_model, "labour_model.joblib")
print("Created mock labour model: labour_model.joblib")
print("This is a temporary model for testing. Replace with a properly trained model.")