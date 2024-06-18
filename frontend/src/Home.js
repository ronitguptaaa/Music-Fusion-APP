import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <div className="Home">
            <div className="block" component={Link} to="/music">
                <Link to="/music">
                    <h2>Music</h2>
                </Link>
            </div>
            <div className="block" component={Link} to="/sports">
                <Link to="/sports">
                    <h2>Sports</h2>
                </Link>
            </div>
        </div>
    );
}

export default Home;
