import pandas as pd
from sklearn.preprocessing import StandardScaler

def feature_engineering(data):
    # Handle missing values
    data = data.fillna(method='ffill')

    # Feature scaling
    scaler = StandardScaler()
    scaled_data = scaler.fit_transform(data)

    return scaled_data
