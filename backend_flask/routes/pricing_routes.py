# backend_flask/routes/pricing_routes.py

from flask import Blueprint, request, jsonify
import joblib
import os
from dotenv import load_dotenv

load_dotenv()

# Load the model once
model_path = os.getenv("MODEL_PATH")
model = joblib.load(model_path)
model = joblib.load('ml/pricing_model.pkl')

pricing_bp = Blueprint('pricing', __name__)

# API endpoint to get predicted price
@pricing_bp.route('/predict_price', methods=['POST'])
def predict_price():
    try:
        data = request.get_json()  # Expecting JSON data in the format {"base_price": value, "competitor_price": value}
        base_price = data['base_price']
        competitor_price = data['competitor_price']
        
        # Prepare data for prediction
        features = [[base_price, competitor_price]]
        
        predicted_price = model.predict(features)[0]
        
        return jsonify({"predicted_price": predicted_price}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400
