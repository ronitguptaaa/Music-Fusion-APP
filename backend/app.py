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

def fetch_all_records(table_name):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    cursor.execute(f"SELECT * FROM {table_name} ORDER BY artist, title")
    results = cursor.fetchall()
    
    cursor.close()
    conn.close()
    
    return results

@app.route('/api/music-news/apple', methods=['GET'])
def get_apple_music_news():
    data = fetch_all_records('AppleMusicDetails')
    return jsonify(data)

@app.route('/api/music-news/spotify', methods=['GET'])
def get_spotify_music_news():
    data = fetch_all_records('SpotifyDetails')
    return jsonify(data)

@app.route('/api/music-news/MusicFusion', methods=['GET'])
def get_MusicFusion_news():
    data = fetch_all_records('MusicFusionDetails')
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
