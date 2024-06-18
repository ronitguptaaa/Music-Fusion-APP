import React, { useState, useEffect } from 'react';

function MusicNews({ apiUrl }) {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setNews(data);
            } catch (error) {
                console.error('Error fetching music news:', error);
            }
        };

        fetchNews();
    }, [apiUrl]);

    return (
        <div className="MusicNews">
            <h2>Music News</h2>
            {news.length > 0 ? (
                news.map((item, index) => (
                    <div key={index} className="news-item">
                        <h3>{item.Title}</h3>
                        <p>{item.Description}</p>
                        <a href={item.URL} target="_blank" rel="noopener noreferrer">Read more</a>
                    </div>
                ))
            ) : (
                <p>No news available.</p>
            )}
        </div>
    );
}

export default MusicNews;
