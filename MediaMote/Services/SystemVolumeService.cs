using NAudio.CoreAudioApi;

namespace MediaMote.Services
{
    /// <summary>
    /// Provides methods to get and set the system (master) volume using NAudio.
    /// </summary>
    public class SystemVolumeService
    {
        private readonly MMDeviceEnumerator _deviceEnumerator;
        private readonly MMDevice _device;

        public SystemVolumeService()
        {
            _deviceEnumerator = new MMDeviceEnumerator();
            // Get the default audio endpoint for output (speakers).
            _device = _deviceEnumerator.GetDefaultAudioEndpoint(DataFlow.Render, Role.Multimedia);
        }

        /// <summary>
        /// Gets the current system volume as a scalar value (ranging from 0.0 to 1.0).
        /// </summary>
        public float GetVolume()
        {
            return _device.AudioEndpointVolume.MasterVolumeLevelScalar;
        }

        /// <summary>
        /// Sets the system volume.
        /// </summary>
        /// <param name="volume">The desired volume level (0.0 to 1.0).</param>
        public void SetVolume(float volume)
        {
            if (volume < 0f)
            {
                volume = 0f;
            }
            else if (volume > 1f)
            {
                volume = 1f;
            }

            _device.AudioEndpointVolume.MasterVolumeLevelScalar = volume;
        }
    }
}
