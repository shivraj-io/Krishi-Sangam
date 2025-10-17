import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder

# Example dataset
data = pd.DataFrame({
    "State": ["Madhya Pradesh", "Maharashtra", "Karnataka", "Madhya Pradesh"],
    "Year": [2015, 2016, 2017, 2018],
    "Season": ["Kharif", "Rabi", "Kharif", "Zaid"],
    "Crop": ["Rice", "Wheat", "Soybean", "Maize"],
    "Area": [1000, 800, 1200, 600],
    "Production": [2500, 1900, 3100, 1200],
    "Rainfall": [800, 600, 900, 400]
})

# Encode categorical features
for col in ["State", "Season", "Crop"]:
    le = LabelEncoder()
    data[col] = le.fit_transform(data[col])

X = data[["State", "Year", "Season", "Crop", "Area", "Rainfall"]]
y = data["Production"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

joblib.dump(model, "yield_model.pkl")
print("Yield model saved!")
