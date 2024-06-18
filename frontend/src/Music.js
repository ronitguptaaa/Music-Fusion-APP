import React, { useState, useEffect } from 'react';
import './Music.css';

function Music() {
    const [artists, setArtists] = useState([]);
    const [generalMusicNews, setGeneralMusicNews] = useState([]);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const responseArtists = await fetch('http://127.0.0.1:5000/api/artists');
                if (!responseArtists.ok) throw new Error('Network response was not ok');
                const dataArtists = await responseArtists.json();
                setArtists(dataArtists);
            } catch (error) {
                console.error('Error fetching artists:', error);
            }
        };

        const fetchGeneralMusicNews = async () => {
            try {
                const responseGeneral = await fetch('http://127.0.0.1:5000/api/music-news/general');
                if (!responseGeneral.ok) throw new Error('Network response was not ok');
                const dataGeneral = await responseGeneral.json();
                const formattedData = dataGeneral.map(item => ({
                    ...item,
                    publishedAt: new Date(item.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric'
                    })
                }));
                setGeneralMusicNews(formattedData);
            } catch (error) {
                console.error('Error fetching general music news:', error);
            }
        };

        fetchArtists();
        fetchGeneralMusicNews();
    }, []);

    return (
        <div className="Music">
            <h2>Latest Music News</h2>
            <div className="general-news">
                {generalMusicNews.map((newsItem, index) => (
                    <a key={index} href={newsItem.url} target="_blank" rel="noopener noreferrer" className="news-link">
                        <div className="news-item">
                            <img src={newsItem.urlToImage} alt={newsItem.title} className="news-image" />
                            <div className="news-details">
                                <span className="news-title">{newsItem.title}</span>
                                <span className="news-source">Author: {newsItem.author}</span>
                                <span className="news-source">Published At: {newsItem.publishedAt}</span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            <h2>Global Artists</h2>
            <div className="artists-grid">
                {artists.map((artist, index) => (
                    <div key={index} className="artist-item">
                        <img src={artist.image_url} alt={artist.SpotifyArtist} className="artist-image" />
                        <div className="artist-details">
                            <span className="artist-name">{artist.SpotifyArtist}</span>
                            <span className="artist-followers">Followers: {artist.followers.toLocaleString()}</span>
                            <span className="artist-popularity">Popularity: {artist.Popularity}</span>
                        </div>
                        <div className="artist-links">
                            <button onClick={() => window.open(`https://open.spotify.com/artist/${artist.SpotifyArtistID}`, '_blank')}>Spotify Music</button>
                            <button onClick={() => window.open(`https://music.apple.com/us/artist/${artist.AppleArtistID}`, '_blank')}>Apple Music</button>
                            <button onClick={() => window.open(`https://music.youtube.com/channel/${artist.YoutubeArtistID}`, '_blank')}>YouTube Music</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Music;
