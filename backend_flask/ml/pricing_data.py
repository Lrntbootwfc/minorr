import os
from kaggle.api.kaggle_api_extended import KaggleApi
import pandas as pd
from datetime import datetime
from utils.data_loader import save_to_database  # Example utility import

class PricingDataFetcher:
    def __init__(self):
        self.api = KaggleApi()
        self.api.authenticate()
        self.raw_data_path = os.path.join(os.path.dirname(__file__), '../../data/raw')
        
        if not os.path.exists(self.raw_data_path):
            os.makedirs(self.raw_data_path)
    
    def fetch_latest_data(self, dataset_name="gauravduttakiit/uber-pricing-data"):
        """Main method to fetch and preprocess pricing data"""
        try:
            print(f"{datetime.now()} - Fetching pricing data from Kaggle...")
            
            # Clear previous downloads
            for f in os.listdir(self.raw_data_path):
                if f.endswith('.csv'):
                    os.remove(os.path.join(self.raw_data_path, f))
            
            # Download new data
            self.api.dataset_download_files(
                dataset=dataset_name,
                path=self.raw_data_path,
                unzip=True,
                force=True
            )
            
            # Process and return data
            return self._process_data()
            
        except Exception as e:
            print(f"Kaggle API Error: {str(e)}")
            return None
    
    def _process_data(self):
        """Process raw CSV data"""
        for file in os.listdir(self.raw_data_path):
            if file.endswith('.csv'):
                df = pd.read_csv(os.path.join(self.raw_data_path, file))
                
                # Add your preprocessing here
                df['timestamp'] = pd.to_datetime(df['timestamp'])
                df = df.dropna()
                
                # Save to database
                save_to_database(df, table_name="pricing_raw")
                
                return df