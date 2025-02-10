using Microsoft.AspNetCore.Mvc;
using MediaMote.Services;

namespace MediaMote.Controllers
{
    /// <summary>
    /// API controller for controlling media playback (play/pause, next, previous).
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class PlaybackController : ControllerBase
    {
        private readonly SystemPlaybackService _playbackService;

        public PlaybackController(SystemPlaybackService playbackService)
        {
            _playbackService = playbackService;
        }

        /// <summary>
        /// Toggles play/pause.
        /// </summary>
        /// <returns>No content.</returns>
        [HttpPost("playpause")]
        public IActionResult PlayPause()
        {
            _playbackService.PlayPause();
            return NoContent();
        }

        /// <summary>
        /// Skips to the next track.
        /// </summary>
        /// <returns>No content.</returns>
        [HttpPost("next")]
        public IActionResult Next()
        {
            _playbackService.NextTrack();
            return NoContent();
        }

        /// <summary>
        /// Skips to the previous track.
        /// </summary>
        /// <returns>No content.</returns>
        [HttpPost("previous")]
        public IActionResult Previous()
        {
            _playbackService.PreviousTrack();
            return NoContent();
        }
    }
}
