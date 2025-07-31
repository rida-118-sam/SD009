from flask import Flask, request, jsonify
from flask_cors import CORS
from model.recommender import Recommender

app = Flask(__name__)
CORS(app)

recommender = Recommender('model/dataset.json')

@app.route('/')
def home():
    return "Server is running. Try /recommend?id=1 or /recommend/all"

@app.route('/recommend/all', methods=['GET'])
def recommend_all():
    all_recommendations = {}
    for item in recommender.data:
        item_id = item['id']
        all_recommendations[item_id] = recommender.recommend(item_id)
    return jsonify(all_recommendations)

@app.route('/recommend', methods=['GET'])
def get_recommendations():
    item_id = int(request.args.get('id'))
    recommendations = recommender.recommend(item_id)
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True)

