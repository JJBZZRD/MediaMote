/**
 * Sends a play/pause command.
 */
export async function playPause() {
  const response = await fetch('/api/playback/playpause', {
    method: 'POST'
  });
  if (!response.ok) {
    throw new Error('Failed to toggle play/pause.');
  }
}

/**
 * Sends a command to skip to the next track.
 */
export async function nextTrack() {
  const response = await fetch('/api/playback/next', {
    method: 'POST'
  });
  if (!response.ok) {
    throw new Error('Failed to skip to next track.');
  }
}

/**
 * Sends a command to go back to the previous track.
 */
export async function previousTrack() {
  const response = await fetch('/api/playback/previous', {
    method: 'POST'
  });
  if (!response.ok) {
    throw new Error('Failed to skip to previous track.');
  }
}
