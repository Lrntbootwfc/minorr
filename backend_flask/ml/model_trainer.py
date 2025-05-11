import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import joblib
import os
import traceback

class ModelTrainer:
    def __init__(self, dataframe, verbose=False):
        self.df = dataframe
        self.verbose = verbose

    def log(self, msg):
        if self.verbose:
            print(f"[INFO] {msg}")

    def preprocess(self):
        df = self.df.copy()

    # Drop blank rows
        df.dropna(inplace=True)

    # Normalize column names
        df.columns = df.columns.str.strip().str.lower().str.replace(' ', '_')
        print("📋 Columns in CSV:", df.columns.tolist())

    # Sanitize price strings if needed
        df['actual_price'] = df['actual_price'].astype(str).str.replace('[^0-9.]', '', regex=True)
        df['discounted_price'] = df['discounted_price'].astype(str).str.replace('[^0-9.]', '', regex=True)

    # Convert to numeric
        df['base_price'] = pd.to_numeric(df['actual_price'], errors='coerce')
        df['competitor_price'] = pd.to_numeric(df['discounted_price'], errors='coerce')

        print("📊 Before dropna:", df.shape)
        df = df.dropna(subset=['base_price', 'competitor_price'])
        print("✅ After dropna:", df.shape)

        df = df[(df['base_price'] > 0) & (df['competitor_price'] > 0)]
        print("✅ After filtering non-positive:", df.shape)

    # Feature engineering
        df['price_gap'] = df['base_price'] - df['competitor_price']
        df['discount_rate'] = df['price_gap'] / df['base_price']

    # Target
        target = df['base_price'] * (1 - df['discount_rate'] * 0.65)
        features = df[['base_price', 'competitor_price', 'discount_rate']]

    # Train the RandomForestRegressor to generate 'rf_price' before splitting
        rf = RandomForestRegressor(n_estimators=100, random_state=42)
        rf.fit(features, target)  # Fit on the entire feature set
        rf_preds = rf.predict(features)

    # Add the 'rf_price' and 'bo_signal' columns to the dataframe
        df['rf_price'] = rf_preds
        df['bo_signal'] = np.clip(df['discount_rate'] * np.random.uniform(0.9, 1.1, size=len(df)), 0, 1)

        return df[['base_price', 'competitor_price', 'discount_rate', 'rf_price', 'bo_signal']], target
    
    def run(self, enriched=False):
        try:
            self.log("Model training initiated...")
            df, y = self.preprocess()

            if df.empty or y.empty:
                raise ValueError("🚫 No valid data left after preprocessing. Check CSV formatting and price columns.")

            X_train, X_test, y_train, y_test = train_test_split(df, y, test_size=0.2, random_state=42)

        # Final model trained on enriched features
            final_model = GradientBoostingRegressor(
                n_estimators=250, learning_rate=0.08, max_depth=5, random_state=42
            )
            final_model.fit(X_train, y_train)

            preds_test = final_model.predict(X_test)
            mse = mean_squared_error(y_test, preds_test)
            rmse = np.sqrt(mse)
            self.log(f"📈 Model evaluation: MSE = {mse:.2f}, RMSE = {rmse:.2f}")

            model_path = os.path.join(os.path.dirname(__file__), "pricing_model.pkl")
            joblib.dump(final_model, model_path)
            self.log(f"✅ Model successfully saved at: {model_path}")

        # Add predicted final prices to the dataframe
            df['final_optimized_price'] = final_model.predict(df)

            return df

        except Exception as e:
            print("❌ Error occurred during model training:")
            traceback.print_exc()
            return None  # Prevent further indexing if failure happens
 # Prevent further indexing if failure happens

# Entry point for CLI
if __name__ == "__main__":
    print("=== Model Training Script ===")
    
    data_path = os.path.join(os.path.dirname(__file__), "../scripts/data/raw/amazon.csv")
    
    if not os.path.exists(data_path):
        raise FileNotFoundError(f"❌ Dataset not found at: {data_path}\nCheck filename or path.")
    
    df = pd.read_csv(data_path)
    trainer = ModelTrainer(df, verbose=True)

    print("⏳ Running training...")
    enriched_df = trainer.run(enriched=True)

    if enriched_df is not None:
        print("✅ Model training complete.")
        print(enriched_df[['base_price', 'competitor_price', 'final_optimized_price']].head())
    else:
        print("⚠️ Model training failed. Check logs above.")
