import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
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
        </div>
    );
}

export default Home;
