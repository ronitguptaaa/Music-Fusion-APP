from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)
db_config = {
    'user': 'root',
    'password': 'ronitgupta28',
    'host': '127.0.0.1',
    'database': 'MusicFusion',
}

def fetch_all_records():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM AppleMusicDetails ORDER BY artist, title")
    results = cursor.fetchall()
    
    cursor.close()
    conn.close()
    
    return results

@app.route('/api/music-news', methods=['GET'])
def get_music_news():
    data = fetch_all_records()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
