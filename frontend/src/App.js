import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function Home() {
    return (
        <div className="Home">
            <h1>Two Eyez</h1>
            <div>
                <button><Link to="/apple">Apple Music</Link></button>
                <button><Link to="/spotify">Spotify</Link></button>
                <button><Link to="/MusicFusion">MusicFusion</Link></button>
            </div>
        </div>
    );
}

function MusicNews({ apiUrl }) {
    const [musicNews, setMusicNews] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMusicNews = async () => {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                console.log('Fetched data:', data);
                setMusicNews(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            }
        };

        fetchMusicNews();
    }, [apiUrl]);

    return (
        <div className="MusicNews">
            <h1>Music News</h1>
            {error && <p>Error: {error}</p>}
            {musicNews.length > 0 ? (
                <div>
                    {musicNews.map((news, index) => (
                        <div key={index} style={{ marginBottom: '20px' }}>
                            <p><strong>Artist:</strong> {news.Artist}</p>
                            <p><strong>Title:</strong> {news.Title}</p>
                            <p><strong>Description:</strong> {news.Description}</p>
                            <a href={news.URL} target="_blank" rel="noopener noreferrer">Read more</a>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/apple" element={<MusicNews apiUrl="http://127.0.0.1:5000/api/music-news/apple" />} />
                    <Route path="/spotify" element={<MusicNews apiUrl="http://127.0.0.1:5000/api/music-news/spotify" />} />
                    <Route path="/MusicFusion" element={<MusicNews apiUrl="http://127.0.0.1:5000/api/music-news/MusicFusion" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
