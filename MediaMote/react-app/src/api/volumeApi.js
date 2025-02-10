/**
 * Gets the current system volume.
 * @returns {Promise<number>} A promise that resolves to the current volume level (0.0 to 1.0).
 */
export async function getVolume() {
  const response = await fetch('/api/volume');
  if (!response.ok) {
    throw new Error('Failed to fetch the current volume.');
  }
  const volume = await response.json();
  return volume;
}

/**
 * Sets the system volume.
 * @param {number} volume - The desired volume level (0.0 to 1.0).
 * @returns {Promise<void>}
 */
export async function setVolume(volume) {
  const response = await fetch('/api/volume', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(volume)
  });
  
  if (!response.ok) {
    throw new Error('Failed to set the volume.');
  }
}
