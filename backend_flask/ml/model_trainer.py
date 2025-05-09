import pandas as pd
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
import numpy as np
from ml.models.q_learning_model import QLearningOptimizer
from ml.models.bayesian_optimizer import BayesianOptimizer
from utils.data_loader import save_to_database  # Importing save function for database

class ModelTrainer:
    def __init__(self, data):
        self.data = data  # Assuming the data passed is a dataframe
        self.rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.gbm_model = GradientBoostingRegressor(n_estimators=100, random_state=42)

    def run(self, enriched=False):
        df = self.data.copy()

        # Feature set update: Added 'inventory' and 'demand'
        features = ["base_price", "competitor_price", "inventory", "demand"]

        print("Training Random Forest Model...")
        # 1. Random Forest prediction
        self.rf_model.fit(df[features], df["final_price"])
        df['rf_predicted_price'] = self.rf_model.predict(df[features])

        print("Simulating Q-Learning...")
        # 2. Q-Learning simulation - Here, we simulate Q-Learning-based price adjustments
        df['qlearn_optimized'] = self._simulate_q_learning(df['rf_predicted_price'])

        print("Running Bayesian Optimization...")
        # 3. Bayesian optimization - apply this optimization to all rows (simplified model)
        bayes_price = self._run_bayesian_optimization(df)
        df['bayes_optimized'] = bayes_price

        # Stacking model outputs for GBM input
        stacked_features = ["rf_predicted_price", "qlearn_optimized", "bayes_optimized"]

        # 4. Gradient Boosting Machine (GBM) on stacked predictions
        print("Training Gradient Boosting Machine Model...")
        self.gbm_model.fit(df[stacked_features], df["final_price"])

        # 5. Predict using GBM model
        df['final_optimized_price'] = self.gbm_model.predict(df[stacked_features])

        # Save the results back into the database
        save_to_database(df, table_name="optimized_pricing_data")

        print("Model training complete. Final optimized price predictions:")
        print(df[['rf_predicted_price', 'qlearn_optimized', 'bayes_optimized', 'final_optimized_price']].head())

        return df

    def _simulate_q_learning(self, rf_predictions):
        """
        Simulate Q-Learning model-based price adjustment. This function is a placeholder.
        Ideally, you'd use a QLearningOptimizer class, which applies reinforcement learning techniques.
        """
        optimizer = QLearningOptimizer()
        return optimizer.optimize_prices(rf_predictions)

    def _run_bayesian_optimization(self, df):
        """
        Simple placeholder for Bayesian Optimization. In practice, you would apply your Bayesian
        Optimization logic to fine-tune prices based on the features provided.
        """
        optimizer = BayesianOptimizer(df)
        return optimizer.optimize()








# import pandas as pd
# from sklearn.ensemble import GradientBoostingRegressor
# import joblib

# print("Loading data...")  # Added print
# data = pd.read_csv("sample_products.csv")

# print("Preparing features and labels...")  # Added print
# X = data[["base_price", "competitor_price"]]
# y = data["final_price"]

# print("Training model...")  # Added print
# model = GradientBoostingRegressor()
# model.fit(X, y)

# print("Saving the model...")  # Added print
# joblib.dump(model, "pricing_model.pkl")
# print("Model saved as pricing_model.pkl")
