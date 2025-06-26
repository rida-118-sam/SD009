from flask import Flask, render_template, jsonify, request
import json
import os

app = Flask(__name__)
DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')

def convert_to_embed(url):
    if 'watch?v=' in url:
        return url.replace('watch?v=', 'embed/')
    elif 'youtu.be/' in url:
        return url.replace('youtu.be/', 'www.youtube.com/embed/')
    return url

@app.route('/')
def index():
    return render_template('feed.html')

@app.route('/get_posts/<category>')
def get_posts(category):
    page = int(request.args.get('page', 1))
    per_page = 10
    start = (page - 1) * per_page
    end = start + per_page

    file_map = {
        'photo': ('photofeed.json', 'image_url'),
        'video': ('videofeed.json', 'video_url'),
        'reel':  ('reelfeed.json', 'reel_url')
    }

    if category not in file_map:
        return jsonify([])

    filename, url_key = file_map[category]
    filepath = os.path.join(DATA_DIR, filename)

    try:
        with open(filepath, 'r') as f:
            data = json.load(f)
    except FileNotFoundError:
        return jsonify([])

    posts = []
    for item in data[start:end]:
        url = item.get(url_key, '')
        if category in ['video', 'reel']:
            url = convert_to_embed(url)

        posts.append({
            'title': item.get('title', 'No Title'),
            'description': item.get('description', ''),
            'url': url,
            'type': category
        })

    return jsonify(posts)

if __name__ == '__main__':
    app.run(debug=True)