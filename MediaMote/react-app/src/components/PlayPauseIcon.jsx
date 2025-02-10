import React from 'react';
import Box from '@mui/material/Box';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import Typography from '@mui/material/Typography';

/**
 * PlayPauseIcon renders a composite icon that displays the play and pause icons
 * in-line horizontally with a '/' between them.
 * The spacing between the icons has been reduced.
 */
const PlayPauseIcon = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <PlayArrowIcon sx={{ fontSize: 28, mr: 0.001 }} />
      <Typography
        variant="h6"
        component="span"
        sx={{
          mx: 0.001,
          fontWeight: 'bold',
          fontSize: 28,
          lineHeight: 1,
        }}




      >
        /
      </Typography>
      <PauseIcon sx={{ fontSize: 28, ml: 0.001 }} />
    </Box>




  );
};

export default PlayPauseIcon;
