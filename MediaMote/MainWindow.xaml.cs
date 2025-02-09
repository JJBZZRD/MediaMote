using System;
using System.Threading.Tasks;
using System.Windows;
using MediaMote.Services;

namespace MediaMote
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        // Path to the folder containing your React app's production build (update as needed).
        private readonly string webRootPath = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "react-app/build");
        private readonly WebServerService _webServerService;



        public MainWindow()
        {
            InitializeComponent();
            _webServerService = new WebServerService(webRootPath);
            Loaded += MainWindow_Loaded;
            Unloaded += MainWindow_Unloaded;
        }

        private async void MainWindow_Loaded(object sender, RoutedEventArgs e)
        {
            try
            {
                await _webServerService.StartAsync();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error starting web server: {ex.Message}");
            }
        }

        private async void MainWindow_Unloaded(object sender, RoutedEventArgs e)
        {
            await _webServerService.StopAsync();
        }
    }
}