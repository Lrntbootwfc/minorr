import joblib
import pandas as pd

# Load the saved model
model = joblib.load("pricing_model.pkl")

# Test the model on new data (you can create your own data or use some from the CSV)
test_data = pd.DataFrame({
    "base_price": [100, 200],
    "competitor_price": [95, 210]
})

# Make predictions
predictions = model.predict(test_data)

# Print predictions
print(predictions)
