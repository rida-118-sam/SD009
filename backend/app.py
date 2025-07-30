from flask import Flask, request, jsonify
from recommender import get_recommendations
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/recommend', methods=['GET'])
def recommend():
    user_id = request.args.get('user_id')
    page = int(request.args.get('page', 1))
    size = int(request.args.get('size', 10))

    recommendations = get_recommendations(user_id, page, size)
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True)
