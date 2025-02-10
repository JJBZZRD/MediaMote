import { useState, useRef, useEffect } from 'react';
import { getVolume, setVolume } from '../api/volumeApi';

/**
 * Custom hook to manage system volume control logic.
 * Fetches the current volume on mount and provides handlers for 
 * tap and continuous press adjustments.
 *
 * @param {number} initialVolume - Initial volume percentage (0-100)
 * @returns {object} - Contains volume state and event handlers.
 */
export default function useVolumeControl(initialVolume = 50) {
  // Initialize with a default value, but then update from the API.
  const [volume, setVolumeState] = useState(initialVolume);

  // On mount, fetch the current volume via the API.
  useEffect(() => {
    getVolume()
      .then((vol) => {
        // The API returns a scalar (0.0 - 1.0). Convert to a percentage.
        const initialVol = Math.round(vol * 100);
        setVolumeState(initialVol);
      })
      .catch((error) => {
        console.error('Failed to fetch volume from API:', error);
      });
  }, []);

  // Refs for managing delayed and continuous updates.
  const incrementTimeoutRef = useRef(null);
  const decrementTimeoutRef = useRef(null);
  const incrementIntervalRef = useRef(null);
  const decrementIntervalRef = useRef(null);

  /**
   * Helper function using a functional update so that state transitions are atomic.
   * The provided updater receives the previous volume and returns the next volume.
   *
   * Also calls the API to set the volume (converting to scalar form).
   *
   * @param {function} updater - Function that takes the previous volume and returns the new volume.
   */
  const updateVolume = (updater) => {
    setVolumeState((prev) => {
      const updated = updater(prev);
      setVolume(updated / 100).catch((error) =>
        console.error('Error setting volume:', error)
      );
      return updated;
    });
  };

  // Single tap increment (by 5)
  const handleTapIncrement = () => {
    updateVolume((prev) => Math.min(100, prev + 5));
  };

  // Continuous increment (by 5)
  const handleContinuousIncrement = () => {
    updateVolume((prev) => Math.min(100, prev + 5));
  };

  // Single tap decrement (by 5)
  const handleTapDecrement = () => {
    updateVolume((prev) => Math.max(0, prev - 5));
  };

  // Continuous decrement (by 5)
  const handleContinuousDecrement = () => {
    updateVolume((prev) => Math.max(0, prev - 5));
  };

  // Start increment: immediate tap (+5) then after a delay, continuous updates (+5 every 150ms)
  const startIncrement = () => {
    handleTapIncrement();
    if (!incrementTimeoutRef.current) {
      incrementTimeoutRef.current = setTimeout(() => {
        incrementIntervalRef.current = setInterval(handleContinuousIncrement, 150);
      }, 300);
    }
  };

  // Stop continuous increment.
  const stopIncrement = () => {
    if (incrementTimeoutRef.current) {
      clearTimeout(incrementTimeoutRef.current);
      incrementTimeoutRef.current = null;
    }
    if (incrementIntervalRef.current) {
      clearInterval(incrementIntervalRef.current);
      incrementIntervalRef.current = null;
    }
  };

  // Start decrement: immediate tap (-5) then after a delay, continuous updates (-5 every 150ms)
  const startDecrement = () => {
    handleTapDecrement();
    if (!decrementTimeoutRef.current) {
      decrementTimeoutRef.current = setTimeout(() => {
        decrementIntervalRef.current = setInterval(handleContinuousDecrement, 150);
      }, 300);
    }
  };

  // Stop continuous decrement.
  const stopDecrement = () => {
    if (decrementTimeoutRef.current) {
      clearTimeout(decrementTimeoutRef.current);
      decrementTimeoutRef.current = null;
    }
    if (decrementIntervalRef.current) {
      clearInterval(decrementIntervalRef.current);
      decrementIntervalRef.current = null;
    }
  };

  /**
   * Handler for slider change events.
   *
   * @param {number} newValue - The new slider value (0-100)
   */
  const handleVolumeChange = (newValue) => {
    setVolumeState(newValue);
    setVolume(newValue / 100).catch((error) =>
      console.error('Error updating volume via slider:', error)
    );
  };

  return {
    volume,
    startIncrement,
    stopIncrement,
    startDecrement,
    stopDecrement,
    handleVolumeChange,
  };
}
