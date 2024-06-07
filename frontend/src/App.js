import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [musicNews, setMusicNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/music-news')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setMusicNews(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Music News</h1>
      </header>
      <div className="news-container">
        {musicNews.map((item, index) => (
          <div key={index} className="news-item">
            <h2>{item.artist}</h2>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <a href={item.url} target="_blank" rel="noopener noreferrer">Read more</a>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
