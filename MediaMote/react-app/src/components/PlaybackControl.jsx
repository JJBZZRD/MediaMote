import React from 'react';
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PlayPauseIcon from './PlayPauseIcon';
import { playPause, nextTrack, previousTrack } from '../api/playbackApi';

/**
 * PlaybackControl is a presentational component that renders buttons
 * for controlling media playback (previous, play/pause, next).
 * It calls the corresponding API endpoints on click.
 */
function PlaybackControl() {
  /**
   * Handle toggling play/pause.
   */
  const handlePlayPause = async () => {
    try {
      await playPause();
    } catch (error) {
      console.error('Error toggling play/pause:', error);
    }
  };

  /**
   * Handle skipping to the previous track.
   */
  const handlePrevious = async () => {
    try {
      await previousTrack();
    } catch (error) {
      console.error('Error going to previous track:', error);
    }
  };

  /**
   * Handle skipping to the next track.
   */
  const handleNext = async () => {
    try {
      await nextTrack();
    } catch (error) {
      console.error('Error going to next track:', error);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginTop: 16 }}>
      <IconButton onClick={handlePrevious} aria-label="previous">
        <SkipPreviousIcon />
      </IconButton>
      <IconButton onClick={handlePlayPause} aria-label="play/pause">
        <PlayPauseIcon />
      </IconButton>
      <IconButton onClick={handleNext} aria-label="next">
        <SkipNextIcon />
      </IconButton>
    </div>
  );
}

export default PlaybackControl;
