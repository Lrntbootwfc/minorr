import pytest
from app import app

@pytest.fixture
def client():
    app.testing = True
    return app.test_client()

def test_predict_valid(client):
    response = client.post("/api/predict_price", json={"base_price": 500, "competitor_price": 520})
    assert response.status_code == 200
    data = response.get_json()
    assert "predicted_price" in data
    assert isinstance(data["predicted_price"], float)

def test_predict_missing_input(client):
    response = client.post("/api/predict_price", json={"base_price": 500})
    assert response.status_code == 400
    data = response.get_json()
    assert data["error"] == "'competitor_price'"

