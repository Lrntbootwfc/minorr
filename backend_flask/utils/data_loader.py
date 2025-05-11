#data_loader.py
from kaggle.api.kaggle_api_extended import KaggleApi
import pandas as pd
import os
from .models import Product
from .db_session import Base,engine

from sqlalchemy.orm import Session
#from ml.model_trainer import ModelTrainer  # Import your actual model here
from sqlalchemy.exc import SQLAlchemyError

def save_to_database(data: dict, db: Session):
    """
    Saves the provided data to the database.
    This assumes 'data' is a dictionary and 'Product' is the SQLAlchemy model.
    """
    try:
        # Assuming the 'data' dictionary matches the model's columns
        new_product = Product(**data)  # This maps 'data' to the 'Product' model

        # Add and commit the new entry to the database
        db.add(new_product)
        db.commit()
        db.refresh(new_product)  # Refresh the object to get the latest data (e.g., auto-generated id)
        return new_product
    except SQLAlchemyError as e:
        db.rollback()  # Rollback the transaction if something goes wrong
        print(f"Error saving to database: {e}")
        return None
def setup_kaggle():
    """Initialize Kaggle API"""
    try:
        api = KaggleApi()
        api.authenticate()
        return api
    except Exception as e:
        print(f"Kaggle API authentication failed: {e}")
        return None


def load_kaggle_dataset(dataset_name, target_folder='data'):
    """
    Generic function to load any Kaggle dataset
    Usage in routes: from utils.data_loader import load_kaggle_dataset
    """
    try:
        api = setup_kaggle()
        if api is None:
            print("Kaggle API is not authenticated.")
            return None
        
        if not os.path.exists(target_folder):
            os.makedirs(target_folder)
        
        api.dataset_download_files(
            dataset=dataset_name,
            path=target_folder,
            unzip=True
        )
        
        # Find the downloaded CSV
        for file in os.listdir(target_folder):
            if file.endswith('.csv'):
                return pd.read_csv(os.path.join(target_folder, file))
                
    except Exception as e:
        print(f"Data loading failed: {e}")
        return None
print("data_loader.py ran successfully")