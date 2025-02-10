import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import useVolumeControl from '../hooks/useVolumeControl';

function VolumeControl() {
  const {
    volume,
    startIncrement,
    stopIncrement,
    startDecrement,
    stopDecrement,
    handleVolumeChange,
  } = useVolumeControl(50);

  return (
    <Box sx={{ width: 300, display: 'flex', alignItems: 'center' }}>
      <IconButton
        onPointerDown={startDecrement}
        onPointerUp={stopDecrement}
        onPointerLeave={stopDecrement}
        aria-label="decrement volume"
      >
        <RemoveIcon />
      </IconButton>
      <Slider
        value={volume}
        onChange={(event, newValue) => handleVolumeChange(newValue)}
        aria-labelledby="volume-slider"
        sx={{ mx: 2 }}
        min={0}
        max={100}
      />
      <IconButton
        onPointerDown={startIncrement}
        onPointerUp={stopIncrement}
        onPointerLeave={stopIncrement}
        aria-label="increment volume"
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
}

export default VolumeControl;
