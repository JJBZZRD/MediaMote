import React from 'react';
import './App.css';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import VolumeControl from './components/VolumeControl';
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

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
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <IconButton aria-label="previous">
            <SkipPreviousIcon />
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">
            <SkipNextIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
