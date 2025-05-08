from kaggle.api.kaggle_api_extended import KaggleApi
import pandas as pd
import os

def setup_kaggle():
    """Initialize Kaggle API"""
    api = KaggleApi()
    api.authenticate()
    return api

def load_kaggle_dataset(dataset_name, target_folder='data'):
    """
    Generic function to load any Kaggle dataset
    Usage in routes: from utils.data_loader import load_kaggle_dataset
    """
    try:
        api = setup_kaggle()
        
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