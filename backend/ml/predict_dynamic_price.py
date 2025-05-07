import pandas as pd
from stacking_model import stack_models

def predict_price(input_data):
    # Pre-process your input data if necessary
    prediction = stack_models(input_data)
    return prediction
