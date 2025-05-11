#pricing_data.py
import os
from kaggle.api.kaggle_api_extended import KaggleApi
import pandas as pd
from datetime import datetime
from utils.data_loader import save_to_database

class PricingDataFetcher:
    def __init__(self):
        self.api = KaggleApi()
        self.api.authenticate()
        self.raw_data_path = os.path.join(os.path.dirname(__file__), '../../data/raw')

        if not os.path.exists(self.raw_data_path):
            os.makedirs(self.raw_data_path)

    def fetch_latest_data(self, dataset_name="karkavelrajaj/amazon-sales-dataset"):
        """Fetch and preprocess Amazon pricing data from Kaggle."""
        try:
            print(f"{datetime.now()} - Fetching pricing data from Kaggle...")

            # Clear existing CSV files
            for f in os.listdir(self.raw_data_path):
                if f.endswith('.csv'):
                    os.remove(os.path.join(self.raw_data_path, f))

            # Download and unzip new dataset
            self.api.dataset_download_files(
                dataset=dataset_name,
                path=self.raw_data_path,
                unzip=True,
                force=True
            )

            return self._process_data()

        except Exception as e:
            print(f"Kaggle API Error: {str(e)}")
            return None

    def _process_data(self):
        """Preprocess the downloaded Amazon sales data."""
        for file in os.listdir(self.raw_data_path):
            if file.endswith('.csv'):
                df = pd.read_csv(os.path.join(self.raw_data_path, file))

                # Standard cleaning
                df = df.dropna()
                df.columns = df.columns.str.strip().str.lower().str.replace(" ", "_")

                # Add 'timestamp'
                df['timestamp'] = pd.to_datetime(datetime.now())

                # Simulated columns for pricing logic
                df['inventory'] = 100  # Assume default initial inventory
                df['demand'] = df['rating_count']
                df['base_price'] = df['mrp']
                df['competitor_price'] = df['selling_price'] * 1.1  # Estimate
                df['final_price'] = df['selling_price']

                # Logic: decrease inventory on each row (simulate purchase)
                df['inventory'] = df['inventory'] - df['demand']

                # Logic: if demand > threshold, increase price slightly
                demand_threshold = df['demand'].mean()
                df['final_price'] = df.apply(
                    lambda row: row['final_price'] * 1.1 if row['demand'] > demand_threshold else row['final_price'],
                    axis=1
                )

                # Save cleaned data
                save_to_database(df, table_name="pricing_raw")

                return df
