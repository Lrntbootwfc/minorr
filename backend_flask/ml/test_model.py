import os
import sys
import joblib
import numpy as np
import pandas as pd
import pytest

# Ensure backend root directory is accessible
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from ml.model_trainer import ModelTrainer

# === Utility Loaders ===
def load_model():
    model_path = os.path.join(os.path.dirname(__file__), "pricing_model.pkl")
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model not found at {model_path}")
    return joblib.load(model_path)

def load_data():
    dataset_path = os.path.join(os.path.dirname(__file__), "../scripts/data/raw/amazon.csv")
    if not os.path.exists(dataset_path):
        raise FileNotFoundError(f"Dataset not found at {dataset_path}")
    
    data = pd.read_csv(dataset_path)
    return data

try:
    data = load_data()
    print("Data loaded successfully.")
except FileNotFoundError as e:
    print(str(e))

# === Fixtures ===
@pytest.fixture(scope="module")
def model():
    return load_model()

@pytest.fixture(scope="module")
def data():
    return load_data()

# === Tests ===
def test_prediction_output_type(model):
    """Test: Single prediction returns a float"""
    input_data = [[1000, 950, 0.1, 970, 0.04]]  # base, comp, disc, rf_price, bo
    prediction = model.predict(input_data)
    assert isinstance(float(prediction[0]), float)
    print("✅ test_prediction_output_type passed")

def test_prediction_range(model):
    """Test: Output is within acceptable pricing bounds"""
    input_data = [[800, 780, 0.05, 790, 0.02]]
    prediction = model.predict(input_data)
    assert 0 < prediction[0] < 10000
    print("✅ test_prediction_range passed")

def test_batch_prediction(model):
    """Test: Batch predictions return correct count and types"""
    batch = [
        [1200, 1100, 0.07, 1120, 0.05],
        [500, 480, 0.02, 490, 0.01],
        [900, 850, 0.09, 860, 0.03]
    ]
    predictions = model.predict(batch)
    assert len(predictions) == 3
    assert all(isinstance(float(p), float) for p in predictions)
    print("✅ test_batch_prediction passed")

def test_training_model(data):
    """Test: Full model pipeline runs and returns expected columns"""
    trainer = ModelTrainer(data)
    result_df = trainer.run(enriched=True)
    assert 'final_optimized_price' in result_df.columns
    assert len(result_df) > 0
    print("✅ test_training_model passed")
    print(result_df[['base_price', 'competitor_price', 'final_optimized_price']].head())

# === Manual CLI Run Support ===
if __name__ == "__main__":
    print("\n=== Running all model tests individually ===")
    model = load_model()
    data = load_data()

    test_prediction_output_type(model)
    test_prediction_range(model)
    test_batch_prediction(model)
    test_training_model(data)

    print("\n🎉 All tests completed successfully!\n")
