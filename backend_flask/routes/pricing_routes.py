# backend_flask/routes/pricing_routes.py

from flask import Blueprint, request, jsonify
import joblib
import os
import numpy as np 
from dotenv import load_dotenv


load_dotenv()

# Update the path to your model file
MODEL_PATH = os.path.join(
    os.path.dirname(
        os.path.dirname(
            os.path.abspath(__file__)
        )
    ),
    'ml',
    'pricing_model.pkl'
)

# Check if model file exists, and if not, return an error
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")

# Load the model
model = joblib.load(MODEL_PATH)

pricing_bp = Blueprint('pricing', __name__)

# API endpoint to get predicted price
@pricing_bp.route('/predict_price', methods=['POST'])
def ml_predict_price():
    try:
        data = request.get_json()  # Expecting JSON data in the format {"base_price": value, "competitor_price": value}
        # Required fields from frontend
        required_fields = ['base_price', 'competitor_price']
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields", "required": required_fields}), 400

        # Base and competitor prices
        base_price = float(data['base_price'])
        competitor_price = float(data['competitor_price'])

        # Derived features
        price_gap = base_price - competitor_price
        discount_rate = price_gap / base_price if base_price != 0 else 0

        # Simulated rf_price and bo_signal
        rf_price = base_price * (1 - discount_rate * 0.65)  # same logic as used during model training
        bo_signal = np.clip(discount_rate * np.random.uniform(0.9, 1.1), 0, 1)

        # Feature array in the correct order used in training
        features = np.array([
            base_price,
            competitor_price,
            discount_rate,
            rf_price,
            bo_signal
        ]).reshape(1, -1)

        predicted_price = model.predict(features)[0]

        return jsonify({
            "predicted_price": round(float(predicted_price), 2),
            "currency": "INR"
        }), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400

print("successfull running till the end")