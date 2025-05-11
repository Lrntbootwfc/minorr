class QLearningOptimizer:
    def __init__(self, learning_rate=0.1, discount_factor=0.9):
        self.learning_rate = learning_rate
        self.discount_factor = discount_factor
        self.q_table = {}

    def update_q_value(self, state, action, reward, next_state):
        old_value = self.q_table.get((state, action), 0)
        future_rewards = [self.q_table.get((next_state, a), 0) for a in range(2)]  # assuming binary actions
        max_future = max(future_rewards)
        new_value = old_value + self.learning_rate * (reward + self.discount_factor * max_future - old_value)
        self.q_table[(state, action)] = new_value

    def get_action(self, state, epsilon=0.1):
        import random
        if random.random() < epsilon:
            return random.choice([0, 1])  # exploration
        else:
            q_values = [self.q_table.get((state, a), 0) for a in range(2)]
            return q_values.index(max(q_values))  # exploitation
