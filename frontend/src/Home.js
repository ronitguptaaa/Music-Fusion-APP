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
                {artists.map((Artist, index) => (
                    <div key={index} className="artist-item">
                        <img src={Artist.image} alt={Artist.name} className="artist-image" />
                        <div className="artist-details">
                            <span className="artist-name">{Artist.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
