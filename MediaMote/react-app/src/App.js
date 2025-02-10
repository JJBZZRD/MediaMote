import React from 'react';
import './App.css';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import VolumeControl from './components/VolumeControl';
import PlaybackControl from './components/PlaybackControl';

function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#D3D3D3', // Light grey background
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: '#B0B0B0' }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              textAlign: 'center',
              fontWeight: 'bold',
              color: 'black',
            }}
          >
            MediaMote
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ flexGrow: 0.4 }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <VolumeControl />
        <PlaybackControl />
      </Box>
    </Box>
  );
}

export default App;
