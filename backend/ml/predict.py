import sys
import json
import joblib
import pandas as pd

# Load model
model = joblib.load('backend/ml/pricing_model.pkl')

# Read JSON input from Node.js
input_data = json.loads(sys.argv[1])
df = pd.DataFrame([input_data])

# Predict
predicted_price = model.predict(df)[0]
print(predicted_price)
