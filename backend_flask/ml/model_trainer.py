import pandas as pd
from sklearn.ensemble import GradientBoostingRegressor
import joblib

print("Loading data...")  # Added print
data = pd.read_csv("sample_products.csv")

print("Preparing features and labels...")  # Added print
X = data[["base_price", "competitor_price"]]
y = data["final_price"]

print("Training model...")  # Added print
model = GradientBoostingRegressor()
model.fit(X, y)

print("Saving the model...")  # Added print
joblib.dump(model, "pricing_model.pkl")
print("Model saved as pricing_model.pkl")
