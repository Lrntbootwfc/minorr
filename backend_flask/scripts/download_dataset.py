import os
from kaggle.api.kaggle_api_extended import KaggleApi

# Initialize Kaggle API
api = KaggleApi()
api.authenticate()

# Define the dataset and download path
dataset = 'karkavelrajaj/amazon-sales-dataset'
download_path = 'data/raw'

# Create the download directory if it doesn't exist
os.makedirs(download_path, exist_ok=True)

# Download and unzip the dataset
api.dataset_download_files(dataset, path=download_path, unzip=True)
