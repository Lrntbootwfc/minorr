# ml/pricing_engine.py

import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import MinMaxScaler
from skopt import gp_minimize
import random
from skopt.space import Real

class PricingOptimizer:
    def __init__(self, data):
        self.data = data

    def run(self, enriched=False):
        df = self.data.copy()

        # 1. Add missing fields with defaults if not present
        df["demand_level"] = df.get("demand_level", 0.5)
        df["inventory_level"] = df.get("inventory_level", 10)
        df["seasonal_factor"] = df.get("seasonal_factor", 1.0)
        df["holiday_flag"] = df.get("holiday_flag", 0)

        # 2. Simulate purchase effect
        df["adjusted_inventory"] = df["inventory_level"] - 1    # Decrease by 1 unit (realistic)
        df["adjusted_inventory"] = df["adjusted_inventory"].clip(lower=0)  # prevent negatives

        # 3. Increase demand if inventory decreased and product sold
        df["adjusted_demand"] = df["demand_level"] + np.where(df["adjusted_inventory"] < df["inventory_level"], 1, 0)

        # 4. Train Random Forest
        rf_features = ["base_price", "competitor_price", "adjusted_demand", "adjusted_inventory", "seasonal_factor", "holiday_flag"]
        rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
        rf_model.fit(df[rf_features], df["final_price"])
        df["rf_predicted_price"] = rf_model.predict(df[rf_features])

        # 5. Simulate Q-learning
        df["qlearn_optimized"] = self._simulate_q_learning(df["rf_predicted_price"], df["adjusted_demand"])

        # 6. Bayesian Optimization (per row now!)
        df["bayes_optimized"] = df.apply(lambda row: self._run_bayesian_optimization(row), axis=1)

        # 7. Ensemble
        df["optimized_price"] = (
            0.4 * df["rf_predicted_price"] +
            0.4 * df["qlearn_optimized"] +
            0.2 * df["bayes_optimized"]
        )

        if enriched:
            return df[[
                "base_price", "competitor_price", "adjusted_demand",
                "adjusted_inventory", "seasonal_factor", "holiday_flag",
                "rf_predicted_price", "qlearn_optimized", "bayes_optimized", "optimized_price"
            ]]
        else:
            return df[["base_price", "competitor_price", "optimized_price"]]

    def _simulate_q_learning(self, predicted_prices, demand_series):
        optimized = []
        for price, demand in zip(predicted_prices, demand_series):
            state = price
            q_value = price
            for _ in range(10):
                action = random.choice([-1, 0, 1])
                reward = demand - abs(state - (price + action))  # demand affects reward
                q_value = q_value + 0.1 * (reward - q_value)
                state += action
            optimized.append(max(q_value, 0))
        return optimized

    def _run_bayesian_optimization(self, row=None):
        # If row passed, use its values; otherwise use fixed default
        if row is not None:
            base_price = row["base_price"]
            competitor_price = row["competitor_price"]
            seasonal_factor = row["seasonal_factor"]
            holiday_flag = row["holiday_flag"]
        else:
            base_price = 50
            competitor_price = 48
            seasonal_factor = 1.0
            holiday_flag = 0

        # Simplified dummy logic to simulate BO behavior
        score = (
            0.5 * base_price +
            0.3 * competitor_price +
            10 * seasonal_factor +
            (5 if holiday_flag else 0)
        )
        return score / 2  # Normalize or scale down
