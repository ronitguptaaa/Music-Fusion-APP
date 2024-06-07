import React, { useState, useEffect } from 'react';

function App() {
    const [musicNews, setMusicNews] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMusicNews = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/music-news');
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
    }, []);

    return (
        <div className="App">
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

export default App;
