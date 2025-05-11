"""
Script to check the number of features in the existing model
"""
import os
import joblib
import numpy as np

def check_model_features():
    try:
        # Try to load the model
        model_path = os.path.join(os.path.dirname(__file__), "pricing_model.pkl")
        print(f"Looking for model at: {os.path.abspath(model_path)}")
        
        if not os.path.exists(model_path):
            print(f"ERROR: Model file not found at {model_path}")
            return
            
        model = joblib.load(model_path)
        print(f"Model loaded successfully: {type(model).__name__}")
        
        # Check model parameters
        if hasattr(model, 'n_features_in_'):
            print(f"Number of features expected: {model.n_features_in_}")
        else:
            print("Model doesn't have n_features_in_ attribute")
            
        input_2f = [[100, 110]]
        input_4f = [[100, 110, 50, 0.7]]
        # Try different inputs
        try:
            # Try with 2 features
            prediction_2f = model.predict([[100, 110]])
            print(f"Prediction with 2 features works: {prediction_2f[0]:.2f}")
        except Exception as e:
            print(f"Prediction with 2 features failed: {str(e)}")
            
        try:
            # Try with 4 features
            prediction_4f = model.predict([[100, 110, 50, 0.7]])
            print(f"Prediction with 4 features works: {prediction_4f[0]:.2f}")
        except Exception as e:
            print(f"Prediction with 4 features failed: {str(e)}")
            
    except Exception as e:
        print(f"Error checking model: {str(e)}")

if __name__ == "__main__":
    check_model_features()