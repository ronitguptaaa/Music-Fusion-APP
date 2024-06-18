import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Home from './Home';
import Music from './Music';
import Sports from './Sports';
import MusicNews from './MusicNews';  // Import the MusicNews component
import './index.css';

function App() {
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchIconClick = () => {
        setSearchOpen(!searchOpen);
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = async () => {
        if (searchQuery.trim() !== '') {
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/search?query=${searchQuery}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.error('Error:', error.message);
            }
        }
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
    };

    useEffect(() => {
        if (searchQuery.trim() !== '') {
            handleSearch();
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    return (
        <Router>
            <div className="App">
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="h6" className="title" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold', fontSize: '24px', textAlign: 'left' }}>
                            Two Eyez
                        </Typography>
                        <div className="nav-buttons">
                            <Button color="inherit" component={Link} to="/apple">Apple Music</Button>
                            <Button color="inherit" component={Link} to="/spotify">Spotify</Button>
                            <Button color="inherit" component={Link} to="/MusicFusion">MusicFusion</Button>
                        </div>
                        <div className="top-right">
                            <IconButton color="inherit" onClick={handleSearchIconClick}>
                                <SearchIcon />
                            </IconButton>
                            {searchOpen && (
                                <Box display="flex" alignItems="center">
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        placeholder="Search..."
                                        className="search-input"
                                        value={searchQuery}
                                        onChange={handleSearchInputChange}
                                        style={{ marginLeft: '10px' }}
                                    />
                                    <IconButton color="inherit" onClick={handleClearSearch}>
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                            )}
                            <Button color="inherit">Login</Button>
                        </div>
                    </Toolbar>
                </AppBar>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/music" element={<Music />} />
                    <Route path="/sports" element={<Sports />} />
                    <Route path="/apple" element={<MusicNews apiUrl="http://127.0.0.1:5000/api/music-news/apple" />} />
                    <Route path="/spotify" element={<MusicNews apiUrl="http://127.0.0.1:5000/api/music-news/spotify" />} />
                    <Route path="/MusicFusion" element={<MusicNews apiUrl="http://127.0.0.1:5000/api/music-news/MusicFusion" />} />
                </Routes>
                {searchResults.length > 0 && (
                    <div className="search-results">
                        <h2>Search Results</h2>
                        {searchResults.map((result, index) => (
                            <div key={index} className="result-item">
                                <p><strong>Artist:</strong> {result.artist}</p>
                                <p><strong>Title:</strong> {result.title}</p>
                                <p><strong>Description:</strong> {result.description}</p>
                                <button className="read-more-button" onClick={() => window.open(result.url, '_blank')}>Read more</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Router>
    );
}

export default App;
