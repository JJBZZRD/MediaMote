using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using MediaMote.Services;

namespace MediaMote.Services
{
    /// <summary>
    /// Service for hosting an embedded ASP.NET Core web server.
    /// </summary>
    public class WebServerService
    {
        private readonly string _webRoot;
        private IHost? _host;

        /// <summary>
        /// Initializes a new instance of the WebServerService class.
        /// </summary>
        /// <param name="webRoot">
        /// The physical path to the folder containing the static files (e.g., production build of your React app).
        /// </param>
        public WebServerService(string webRoot)
        {
            _webRoot = webRoot;
        }

        /// <summary>
        /// Starts the embedded web server asynchronously.
        /// </summary>
        /// <param name="cancellationToken">A cancellation token to cancel the start operation.</param>
        public async Task StartAsync(CancellationToken cancellationToken = default)
        {
            if (_host is not null)
            {
                throw new InvalidOperationException("The web server is already running.");
            }

            try
            {
                _host = Host.CreateDefaultBuilder()
                    .ConfigureLogging(logging =>
                    {
                        logging.ClearProviders();
                        logging.AddConsole();
                    })
                    .ConfigureWebHostDefaults(webBuilder =>
                    {
                        webBuilder.UseKestrel()
                            .UseUrls("http://0.0.0.0:5000")
                            .ConfigureServices(services =>
                            {
                                // Enable API controllers.
                                services.AddControllers();
                                // Register the system volume service for dependency injection.
                                services.AddSingleton<SystemVolumeService>();
                                services.AddSingleton<SystemPlaybackService>();
                            })
                            .Configure(app =>
                            {

                                // Serve static and default files for your React app.
                                app.UseDefaultFiles(new DefaultFilesOptions
                                {
                                    FileProvider = new PhysicalFileProvider(_webRoot),
                                    RequestPath = ""
                                });
                                app.UseStaticFiles(new StaticFileOptions
                                {
                                    FileProvider = new PhysicalFileProvider(_webRoot),
                                    RequestPath = ""
                                });

                                // Enable routing so that API endpoints are available.
                                app.UseRouting();
                                app.UseEndpoints(endpoints =>
                                {
                                    endpoints.MapControllers();
                                });

                                // Fallback middleware for client-side routing.
                                app.Use(async (context, next) =>
                                {
                                    await next();

                                    if (context.Response.StatusCode == 404 &&
                                        !Path.HasExtension(context.Request.Path.Value))
                                    {
                                        context.Request.Path = "/index.html";
                                        await next();
                                    }
                                });
                            });
                    })
                    .Build();

                await _host.StartAsync(cancellationToken);
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to start the web server.", ex);
            }
        }

        /// <summary>
        /// Stops the embedded web server asynchronously.
        /// </summary>
        /// <param name="cancellationToken">A cancellation token to cancel the stop operation.</param>
        public async Task StopAsync(CancellationToken cancellationToken = default)
        {
            if (_host is not null)
            {
                await _host.StopAsync(cancellationToken);
                _host.Dispose();
                _host = null;
            }
        }
    }
}
