import React from 'react';
import './App.css';

// Material UI components
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

// Material UI icons
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { getVolume, setVolume } from './api/volumeApi';

function App() {
  // State for controlling the volume slider value
  const [volume, setLocalVolume] = React.useState(50);

  /**
   * Handle slider value changes
   *
   * @param {object} event The event object
   * @param {number} newValue The new slider value
   */
  const handleVolumeChange = async (event, newValue) => {
    const volumeScalar = newValue / 100;
    try {
      await setVolume(volumeScalar);
      setLocalVolume(newValue);
    } catch (error) {
      console.error('Error setting volume:', error);
    }
  };

  /**
   * Decrement the volume, ensuring it does not go below 0.
   */
  const handleDecrementVolume = async () => {
    const newVolume = Math.max(0, volume - 5);
    const volumeScalar = newVolume / 100;
    try {
      await setVolume(volumeScalar);
      setLocalVolume(newVolume);
    } catch (error) {
      console.error('Error decrementing volume:', error);
    }
  };

  /**
   * Increment the volume, ensuring it does not exceed 100.
   */
  const handleIncrementVolume = async () => {
    const newVolume = Math.min(100, volume + 5);
    const volumeScalar = newVolume / 100;
    try {
      await setVolume(volumeScalar);
      setLocalVolume(newVolume);
    } catch (error) {
      console.error('Error incrementing volume:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#D3D3D3', // Light grey background
      }}
    >
      {/* Header with a slightly darker grey background */}
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

      {/* Spacer to push the media controls lower on the page */}
      <Box sx={{ flexGrow: 0.4 }} />

      {/* Media Controls Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 4,
        }}
      >
        {/* Volume Slider with decrement/increment buttons */}
        <Box sx={{ width: 300, display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleDecrementVolume} aria-label="decrement volume">
            <RemoveIcon />
          </IconButton>
          <Slider
            value={volume}
            onChange={handleVolumeChange}
            aria-labelledby="volume-slider"
            sx={{ mx: 2 }}
            min={0}
            max={100}
          />
          <IconButton onClick={handleIncrementVolume} aria-label="increment volume">
            <AddIcon />
          </IconButton>
        </Box>
        {/* Playback control buttons */}
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
