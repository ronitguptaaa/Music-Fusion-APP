from flask import Flask, jsonify, request
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
    cursor.close()
    conn.close()
    return results

def search_records(query):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    search_query = f"""
    SELECT * FROM (
        SELECT artist, title, description, url FROM AppleMusicDetails
        UNION ALL
        SELECT artist, title, description, url FROM SpotifyDetails
        UNION ALL
        SELECT artist, title, description, url FROM MusicFusionDetails
    ) AS combined
    WHERE artist LIKE %s OR title LIKE %s OR description LIKE %s
    """
    like_query = f"%{query}%"
    cursor.execute(search_query, (like_query, like_query, like_query))
    results = cursor.fetchall()
    cursor.close()
    conn.close()
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

@app.route('/api/search', methods=['GET'])
def search_music():
    query = request.args.get('query', '')
    if query:
        data = search_records(query)
        return jsonify(data)
    else:
        return jsonify([])

@app.route('/api/artists', methods=['GET'])
def get_artists():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    query = "SELECT * FROM musicfusion.artistdetailsfinal ORDER BY RAND() LIMIT 3"
    cursor.execute(query)
    results = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(results)

@app.route('/api/music-news/general', methods=['GET'])
def get_general_music_news():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    query = "SELECT * FROM GeneralMusicNews LIMIT 3;"
    cursor.execute(query)
    results = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(results)


if __name__ == '__main__':
    app.run(debug=True)
