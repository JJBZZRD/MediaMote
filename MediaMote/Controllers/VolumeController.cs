using Microsoft.AspNetCore.Mvc;
using MediaMote.Services;

namespace MediaMote.Controllers
{
    /// <summary>
    /// API controller for getting and setting the system volume.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class VolumeController : ControllerBase
    {
        private readonly SystemVolumeService _volumeService;

        public VolumeController(SystemVolumeService volumeService)
        {
            _volumeService = volumeService;
        }

        /// <summary>
        /// Gets the current system volume.
        /// </summary>
        /// <returns>The current volume as a float (0.0 to 1.0).</returns>
        [HttpGet]
        public ActionResult<float> GetVolume()
        {
            float volume = _volumeService.GetVolume();
            return Ok(volume);
        }

        /// <summary>
        /// Sets the system volume.
        /// </summary>
        /// <param name="volume">The desired volume level (0.0 to 1.0).</param>
        /// <returns>No content.</returns>
        [HttpPost]
        public IActionResult SetVolume([FromBody] float volume)
        {
            _volumeService.SetVolume(volume);
            return NoContent();
        }
    }
}
