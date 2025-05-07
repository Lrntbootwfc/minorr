class PricingEnv:
    def __init__(self, data):
        self.data = data
        self.current_step = 0

    def reset(self):
        self.current_step = 0
        return self.data.iloc[self.current_step]

    def step(self, action):
        # Apply pricing action and calculate new state and reward
        next_state = self.data.iloc[self.current_step + 1]
        reward = self.calculate_reward(action)
        self.current_step += 1
        done = self.current_step == len(self.data) - 1
        return next_state, reward, done

    def calculate_reward(self, action):
        # Define how to calculate reward (e.g., profit maximization)
        return action * 0.1  # example logic
