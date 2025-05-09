# test_model.py
import joblib
import pytest
import numpy as np
import pandas as pd
from model_trainer import ModelTrainer

# Load model once before all tests
@pytest.fixture(scope="module")
def model():
    return joblib.load("pricing_model.pkl")

@pytest.fixture(scope="module")
def data():
    # Ensure the dataset is loaded from the correct Kaggle dataset path
    # Replace this path with the location where you have stored your dataset (after download)
    df = pd.read_csv("data/raw/amazon_sales_data.csv")  # Adjust path accordingly
    return df

def test_prediction_output_type(model, data):
    """Test if the model returns a float"""
    input_data = [[1000, 980]]  # base_price, competitor_price
    prediction = model.predict(input_data)
    assert isinstance(prediction[0], float)

def test_prediction_range(model, data):
    """Check if predicted price is in a realistic range"""
    input_data = [[500, 520]]
    prediction = model.predict(input_data)
    assert 0 < prediction[0] < 10000  # Arbitrary upper limit

def test_batch_prediction(model, data):
    """Test model with multiple predictions"""
    input_batch = [[100, 110], [300, 280], [900, 950]]
    predictions = model.predict(input_batch)
    assert len(predictions) == 3
    assert all(isinstance(p, float) for p in predictions)

def test_training_model(data):
    """Test if the model is able to train and predict correctly"""
    trainer = ModelTrainer(data)
    result_df = trainer.run(enriched=True)

    # Check if we get results and if the columns are correct
    assert 'final_optimized_price' in result_df.columns
    assert len(result_df) > 0  # Ensure some results were generated

    # Print the results (optional, for visual verification)
    print(result_df[['base_price', 'competitor_price', 'final_optimized_price']].head())