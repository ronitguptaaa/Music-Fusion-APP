from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error
app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

db_config = {
    'user': 'root',
    'password': 'ronitgupta28',
    'host': '127.0.0.1',
    'database': 'MusicFusion',
}

def fetch_records_from_table(table_name):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        query = f"SELECT * FROM {table_name} ORDER BY artist"
        cursor.execute(query)
        results = cursor.fetchall()
    except Error as e:
        print(f"Error fetching data: {e}")
        results = []
    finally:
        cursor.close()
        conn.close()
    return results

def search_records(query):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        search_query = """
        SELECT artist, title, description, url FROM (
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
    except Error as e:
        print(f"Error searching data: {e}")
        results = []
    finally:
        cursor.close()
        conn.close()
    return results

@app.route('/api/music-news/<source>', methods=['GET'])
def get_music_news(source):
    if source not in ['apple', 'spotify', 'MusicFusion']:
        return jsonify({"error": "Invalid source"}), 400
    table_map = {
        'apple': 'AppleMusicDetails',
        'spotify': 'SpotifyDetails',
        'MusicFusion': 'MusicFusionDetails'
    }
    data = fetch_records_from_table(table_map[source])
    return jsonify(data)

@app.route('/api/artists', methods=['GET'])
def get_artists():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        query = "SELECT * FROM artistdetailsfinal ORDER BY RAND() LIMIT 3"
        cursor.execute(query)
        results = cursor.fetchall()
    except Error as e:
        print(f"Error fetching artists: {e}")
        results = []
    finally:
        cursor.close()
        conn.close()
    return jsonify(results)

@app.route('/api/music-news/general', methods=['GET'])
def get_general_music_news():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        query = "SELECT * FROM GeneralMusicNews ORDER BY RAND() LIMIT 3;"
        cursor.execute(query)
        results = cursor.fetchall()
    except Error as e:
        print(f"Error fetching general music news: {e}")
        results = []
    finally:
        cursor.close()
        conn.close()
    return jsonify(results)

@app.route('/api/music-news/concerts', methods=['GET'])
def get_concert_music_news():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        query = "SELECT * FROM MusicConcertsNews ORDER BY RAND() LIMIT 3;"
        cursor.execute(query)
        results = cursor.fetchall()
    except Error as e:
        print(f"Error fetching concert music news: {e}")
        results = []
    finally:
        cursor.close()
        conn.close()
    return jsonify(results)

@app.route('/api/artist-home', methods=['GET'])
def get_artist_home():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        query = "SELECT * FROM artistdetailsfinal ORDER BY RAND();"
        cursor.execute(query)
        results = cursor.fetchall()
    except Error as e:
        print(f"Error fetching concert music news: {e}")
        results = []
    finally:
        cursor.close()
        conn.close()
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
