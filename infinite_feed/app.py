from flask import Flask, render_template, request, redirect
from pymongo import MongoClient

app = Flask(__name__)

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["your_db"]
users_col = db["users"]

@app.route('/preferences', methods=['GET', 'POST'])
def preferences():
    if request.method == 'POST':
        selected_tags = request.form.getlist('tags')
        user_id = "user001"  # Replace this with dynamic user id later if needed

        users_col.update_one(
            {"user_id": user_id},
            {"$set": {"preferred_tags": selected_tags}},
            upsert=True
        )
        return redirect('/feed')  # Redirect to content page

    return render_template('preferences.html')

if __name__ == '__main__':
    app.run(debug=True)