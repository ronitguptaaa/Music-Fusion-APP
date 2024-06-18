import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Home from './Home';
import Music from './Music';
import Sports from './Sports';
import MusicNews from './MusicNews';
import './App.css';

function App() {
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);

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

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const menuItems = [
        { text: 'Apple Music', path: '/apple' },
        { text: 'Spotify', path: '/spotify' },
        { text: 'MusicFusion', path: '/MusicFusion' },
        { text: 'Music', path: '/music' },
        { text: 'Sports', path: '/sports' }
    ];

    return (
        <Router>
            <div className="App">
                <AppBar position="static" color="default">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className="title" style={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>
                            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                Two Eyez
                            </Link>
                        </Typography>
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
                        <IconButton color="inherit" onClick={handleSearchIconClick}>
                            <SearchIcon />
                        </IconButton>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
                    <div className="drawer-header">
                        <IconButton onClick={toggleDrawer}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <List className="drawer-list">
                        {menuItems.map((item, index) => (
                            <ListItem button key={index} component={Link} to={item.path} onClick={toggleDrawer} className="drawer-item">
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
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
