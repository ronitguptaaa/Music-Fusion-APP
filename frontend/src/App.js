import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Home from './Home';
import Music from './Music';
import Sports from './Sports';
import MusicNews from './MusicNews';
import './App.css';

function App() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [currentHeading, setCurrentHeading] = useState('');

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

    const handleMusicButtonClick = (heading) => {
        setCurrentHeading(heading);
    };

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
                    <Route
                        path="/apple"
                        element={<MusicNews apiUrl="http://127.0.0.1:5000/api/music-news/apple" heading="Apple Music" />}
                    />
                    <Route
                        path="/spotify"
                        element={<MusicNews apiUrl="http://127.0.0.1:5000/api/music-news/spotify" heading="Spotify Music" />}
                    />
                    <Route
                        path="/MusicFusion"
                        element={<MusicNews apiUrl="http://127.0.0.1:5000/api/music-news/MusicFusion" heading="Music Fusion News" />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
