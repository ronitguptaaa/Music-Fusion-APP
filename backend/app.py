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

def fetch_records_from_table(table_name):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    query = f"SELECT * FROM {table_name} ORDER BY artist, title"
    cursor.execute(query)
    results = cursor.fetchall()
    return results

@app.route('/api/music-news/<source>', methods=['GET'])
def get_music_news(source):
    if source == 'apple':
        data = fetch_records_from_table('AppleMusicDetails')
    elif source == 'spotify':
        data = fetch_records_from_table('SpotifyDetails')
    elif source == 'MusicFusion':
        data = fetch_records_from_table('MusicFusionDetails')
    else:
        return jsonify({"error": "Invalid source"}), 400
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
