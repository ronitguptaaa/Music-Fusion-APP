import React, { useState, useEffect } from 'react';
import './Home.css'; // Import the CSS file for styling

function Home() {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/artists');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setArtists(data);
            } catch (error) {
                console.error('Error fetching artists:', error);
            }
        };

        fetchArtists();
    }, []);

    return (
        <div className="Home">
            <h2>Featured Artists</h2>
            <div className="artists-grid">
                {artists.map((artist, index) => (
                    <div key={index} className="artist-item">
                        <img src={artist.image_url} alt={artist.name} className="artist-image" />
                        <div className="artist-details">
                            <span className="artist-name">{artist.name}</span>
                            <span className="artist-followers">Followers: {artist.followers.toLocaleString()}</span>
                            <span className="artist-popularity">Popularity: {artist.popularity}</span>
                        </div>
                        <div className="artist-links">
                            <button onClick={() => window.open(`https://open.spotify.com/artist/${artist.spotify_id}`, '_blank')}>Spotify</button>
                            <button onClick={() => window.open(`https://music.apple.com/us/artist/${artist.apple_music_id}`, '_blank')}>Apple Music</button>
                            <button onClick={() => window.open(`https://music.youtube.com/channel/${artist.youtube_music_id}`, '_blank')}>YouTube Music</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
