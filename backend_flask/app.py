# backend_flask/app.py

from flask import Flask,request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
from routes.pricing_routes import pricing_bp  # Import pricing routes

app = Flask(__name__)
CORS(app)
app.register_blueprint(pricing_bp, url_prefix='/api')
model = joblib.load('ml/pricing_model.pkl')

@app.route('/api/predict_price', methods=['POST'])
def predict_price():
    data = request.get_json()  # Get input data as JSON
    if 'base_price' not in data or 'competitor_price' not in data:
        return jsonify({"error": "Missing input"}), 400 
    features = np.array(data['features']).reshape(1, -1)  # Convert input to numpy array
    prediction = model.predict(features)
    return jsonify({'prediction': prediction[0]})
if __name__ == "__main__":
    app.run(debug=True)

