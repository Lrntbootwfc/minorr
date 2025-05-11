# backend_flask/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
from routes.pricing_routes import pricing_bp  # Import pricing routes
from ml.pricing_data import PricingDataFetcher  # Import the Kaggle integration class
from apscheduler.schedulers.background import BackgroundScheduler
import atexit
from skopt.space import Real
from datetime import datetime
import logging
import os



app = Flask(__name__)
CORS(app)
app.register_blueprint(pricing_bp, url_prefix='/api')

logging.basicConfig(level=logging.INFO) 
# Initialize components
model_path = os.path.join(os.path.dirname(__file__), 'ml/pricing_model.pkl')
model = joblib.load(model_path)  # Kaggle data fetcher instance
data_fetcher = PricingDataFetcher()
# Schedule daily data updates
scheduler = BackgroundScheduler()
scheduler.add_job(func=data_fetcher.fetch_latest_data, trigger="cron", hour=2)  # 2 AM daily
scheduler.start()

# Shut down scheduler when exiting app
atexit.register(lambda: scheduler.shutdown())

@app.route('/predict_price', methods=['POST'])
def predict_price():
    """Enhanced prediction endpoint with fresh data validation"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['base_price', 'competitor_price', 'demand_level']
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields", "required": required_fields}), 400
        
    #     # Auto-fill competitor price if missing
    # if 'competitor_price' not in data:
    #     data['competitor_price'] = data['base_price'] * 0.9  # 10% discount
    
    # # Auto-calculate demand based on inventory status
    # if 'demand_level' not in data:
    #     inventory_status = data.get('inventory_status', 'In Stock')
    #     data['demand_level'] = 1.2 if inventory_status == "In Stock" else 0.8
        
        # Prepare features array
        features = np.array([
            data['base_price'],
            data['competitor_price'],
            data['demand_level'],
            data.get('seasonal_factor', 1.0),  # Optional field with default
            data.get('inventory_level', 0.5)   # Optional field with default
        ]).reshape(1, -1)
        
        # Make prediction
        prediction = model.predict(features)
        
        # Log prediction (you can add database logging here)
        app.logger.info(f"Prediction made: {prediction[0]} for input {data}")
        
        return jsonify({
            'prediction': float(prediction[0]),
            'currency': 'INR',
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        app.logger.error(f"Prediction error: {str(e)}")
        return jsonify({"error": "Prediction failed", "details": str(e)}), 500



@app.route('/refresh_data', methods=['POST'])
def refresh_data():
    """Manual trigger for data refresh"""
    try:
        result = data_fetcher.fetch_latest_data()
        if result is not None:
            return jsonify({"status": "Data refreshed successfully"})
        return jsonify({"error": "Data refresh failed"}), 500
    except Exception as e:
        app.logger.error(f"Manual data refresh error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/')
def home():
    return "Server is running!"
if __name__ == "__main__":
    # Initial data load
    data_fetcher.fetch_latest_data()
    print("app.py ran successfully")
    app.run(debug=True)

