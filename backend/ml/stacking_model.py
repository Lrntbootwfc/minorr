import joblib
import torch
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.externals import joblib

def load_models():
    rf_model = joblib.load('models/rf_model.pkl')
    rl_model = torch.load('models/rl_model.pt')
    # Load any other models as needed
    return rf_model, rl_model

def stack_models(input_data):
    rf_model, rl_model = load_models()

    # Predictions from Random Forest
    rf_pred = rf_model.predict(input_data)

    # Predictions from Reinforcement Learning (simulate or run RL logic here)
    rl_pred = rl_model.predict(input_data)

    # Combine predictions (simple average for example)
    combined_prediction = (rf_pred + rl_pred) / 2

    return combined_prediction
