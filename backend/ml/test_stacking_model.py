import pytest
from ml.stacking_model import stack_models
import numpy as np
import sys
import os

# Add the backend directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))

from ml.stacking_model import stack_models


def test_stack_models():
    # Mock input data (features you would expect from a CSV or data source)
    mock_input_data = np.array([[100, 20, 30], [150, 25, 35]])

    # Call the function you want to test
    prediction = stack_models(mock_input_data)

    # Check if the output is in the expected form (e.g., array, non-empty)
    assert len(prediction) == 2, "Prediction should return 2 values"
    assert isinstance(prediction, np.ndarray), "Prediction should be a numpy array"
