#!/usr/bin/env python3
"""
Analyze the Indian Agriculture Labour Dataset
"""
import pandas as pd
import numpy as np

def analyze_dataset(file_path):
    """Analyze the dataset structure and characteristics"""
    try:
        df = pd.read_csv(file_path)
        print("Dataset Analysis")
        print("=" * 50)
        print(f"Dataset shape: {df.shape}")
        print(f"Columns: {df.columns.tolist()}")
        print("\nColumn Info:")
        print(df.info())
        print("\nTarget Variables:")
        print(f"Labour_Required: {df['Labour_Required'].describe()}")
        print(f"Labour_Demand_Level unique values: {df['Labour_Demand_Level'].unique()}")
        print("\nFirst few rows:")
        print(df.head())
        print("\nMissing values:")
        print(df.isnull().sum())
        
        return df
    except Exception as e:
        print(f"Error analyzing dataset: {e}")
        return None

if __name__ == "__main__":
    dataset_path = "indian_agri_labour_full_dataset.csv"
    df = analyze_dataset(dataset_path)