import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

function Home() {
    const [artists, setArtists] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleArtists, setVisibleArtists] = useState([]);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const responseArtists = await fetch('http://127.0.0.1:5000/api/artist-home');
                if (!responseArtists.ok) throw new Error('Network response was not ok');
                const dataArtists = await responseArtists.json();
                setArtists(dataArtists);
            } catch (error) {
                console.error('Error fetching artists:', error);
            }
        };
        fetchArtists();
    }, []);

    useEffect(() => {
        const updateVisibleArtists = () => {
            const start = currentIndex;
            const end = (currentIndex + 4) % artists.length;
            if (start <= end) {
                setVisibleArtists(artists.slice(start, end + 1));
            } else {
                setVisibleArtists([...artists.slice(start), ...artists.slice(0, end + 1)]);
            }
        };

        updateVisibleArtists();
    }, [currentIndex, artists]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % artists.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + artists.length) % artists.length);
    };

    const handleCarouselClick = (url) => {
        window.open(url, '_blank');
    };

    return (
        <div className="Home">
            <div className="block music-block">
                <Link to="/music" className="block-link">
                    <h2>Music</h2>
                </Link>
            </div>
            <div className="block sports-block">
                <Link to="/sports" className="block-link">
                    <h2>Sports</h2>
                </Link>
            </div>

            <h2>Global Artists</h2>

            <div className="carousel">
                {visibleArtists.map((artist, index) => (
                    <div key={index} className={`slide active`} style={{ backgroundImage: `url(${artist.image_url})` }} onClick={() => handleCarouselClick(`https://open.spotify.com/artist/${artist.SpotifyArtistID}`)}>
                        <h2>{artist.SpotifyArtist}</h2>
                    </div>
                ))}
                <div className="nav-buttons">
                    <IconButton onClick={handlePrev} aria-label="previous">
                        <ChevronLeft />
                    </IconButton>
                    <IconButton onClick={handleNext} aria-label="next">
                        <ChevronRight />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}

export default Home;
