import json
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class Recommender:
    def __init__(self, dataset_path):
        self.data = self.load_data(dataset_path)
        self.tfidf_matrix, self.indices = self.train_model()

    def load_data(self, path):
        with open(path, 'r', encoding='utf-8') as file:
            data = json.load(file)
        return pd.DataFrame(data)

    def preprocess(self):
        self.data['combined'] = self.data['title'] + ' ' + self.data['description'] + ' ' + self.data['tag'].apply(lambda x: ' '.join(x))
        return self.data

    def train_model(self):
        self.preprocess()
        tfidf = TfidfVectorizer(stop_words='english')
        tfidf_matrix = tfidf.fit_transform(self.data['combined'])
        indices = pd.Series(self.data.index, index=self.data['id'])
        return tfidf_matrix, indices

    def recommend(self, item_id, top_n=5):
        if item_id not in self.indices:
            return []
        idx = self.indices[item_id]
        cosine_sim = cosine_similarity(self.tfidf_matrix[idx], self.tfidf_matrix).flatten()
        similar_indices = cosine_sim.argsort()[::-1][1:top_n+1]
        return self.data.iloc[similar_indices].to_dict(orient='records')
