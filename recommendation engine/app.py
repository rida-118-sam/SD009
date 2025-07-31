from flask import Flask, request, jsonify
from flask_cors import CORS
from model.recommender import Recommender

app = Flask(__name__)
CORS(app)

recommender = Recommender('model/dataset.json')

@app.route('/')
def home():
    return "Server is running. Use /recommend?id=1 to get recommendations."


@app.route('/recommend', methods=['GET'])
def get_recommendations():
    item_id = int(request.args.get('id'))
    recommendations = recommender.recommend(item_id)
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True)
