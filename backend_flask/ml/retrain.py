"""
Simple script to create a 4-feature model
"""
import os
import pandas as pd
import numpy as np
from sklearn.ensemble import GradientBoostingRegressor
import joblib

# Create sample data with 4 features
sample_data = pd.DataFrame({
    'base_price': np.random.uniform(50, 150, 100),
    'competitor_price': np.random.uniform(50, 150, 100),
    'inventory': np.random.randint(10, 100, 100),
    'demand': np.random.uniform(0.2, 1.0, 100),
    'final_price': np.random.uniform(60, 160, 100)
})

# Train model with 4 features
X = sample_data[["base_price", "competitor_price", "inventory", "demand"]]
y = sample_data["final_price"]

model = GradientBoostingRegressor(n_estimators=100, random_state=42)
model.fit(X, y)

# Save the model with an ABSOLUTE path
model_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "pricing_model.pkl"))
joblib.dump(model, model_path)
print(f"Model saved to: {model_path}")

# Test the model
test_input = [[100, 110, 50, 0.7]]
prediction = model.predict(test_input)
print(f"Test prediction: ${prediction[0]:.2f}")
print("Done!")