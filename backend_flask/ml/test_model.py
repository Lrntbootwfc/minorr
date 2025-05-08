# test_model.py
import joblib
import pytest
import numpy as np

# Load model once before all tests
@pytest.fixture(scope="module")
def model():
    return joblib.load("pricing_model.pkl")

def test_prediction_output_type(model):
    """Test if model returns float"""
    input_data = [[1000, 980]]  # base_price, competitor_price
    prediction = model.predict(input_data)
    assert isinstance(prediction[0], float)

def test_prediction_range(model):
    """Check if predicted price is in realistic range"""
    input_data = [[500, 520]]
    prediction = model.predict(input_data)
    assert 0 < prediction[0] < 10000  # Arbitrary upper limit

def test_batch_prediction(model):
    """Test model with multiple predictions"""
    input_batch = [[100, 110], [300, 280], [900, 950]]
    predictions = model.predict(input_batch)
    assert len(predictions) == 3
    assert all(isinstance(p, float) for p in predictions)
