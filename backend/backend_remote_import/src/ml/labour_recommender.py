"""
Labour Recommender Model Class
Separate module to avoid joblib serialization issues
"""
import pandas as pd
import numpy as np
from sklearn.base import BaseEstimator

class LabourRecommender(BaseEstimator):
    """
    Unified Labour Prediction Model
    Predicts both labour requirement (regression) and demand level (classification)
    """
    def __init__(self, reg_model=None, cls_model=None, feature_columns=None):
        self.reg_model = reg_model
        self.cls_model = cls_model
        self.feature_columns = feature_columns or []
    
    def predict(self, X):
        """
        Make predictions for both labour requirement and demand level
        Returns list of dictionaries with predictions
        """
        # Ensure input is DataFrame with correct columns
        if isinstance(X, dict):
            X = pd.DataFrame([X])
        elif isinstance(X, list) and len(X) > 0 and isinstance(X[0], dict):
            X = pd.DataFrame(X)
        
        # Reorder columns to match training data
        X_processed = X.reindex(columns=self.feature_columns, fill_value='Unknown')
        
        # Make predictions
        labour_required = self.reg_model.predict(X_processed)
        demand_level = self.cls_model.predict(X_processed)
        
        # Format results
        results = []
        for i in range(len(X_processed)):
            results.append({
                "Labour_Required": int(labour_required[i]),
                "Labour_Demand_Level": demand_level[i]
            })
        
        return results