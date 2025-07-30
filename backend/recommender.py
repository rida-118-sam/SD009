import pandas as pd

# Dummy content-based recommender
df = pd.read_csv('data/dataset.csv')

def get_recommendations(user_id, page, size):
    start = (page - 1) * size
    end = start + size
    # Replace below logic with actual ML-based recommendation
    return df.iloc[start:end].to_dict(orient='records')

