import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MusicNews.css'; // Import CSS file

function MusicNews({ apiUrl, heading }) {
    const [news, setNews] = useState([]);
    const navigate = useNavigate();

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

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="MusicNews">
            <div className="header">
                <h2>{heading}</h2>
                <button onClick={handleBack} className="back-button">Back</button>
            </div>
            {news.length > 0 ? (
                news.map((item, index) => (
                    <div key={index} className="news-item">
                        <h3>{item.Artist}</h3>
                        <h4>{item.Title}</h4>
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
