using System;
using System.Windows;
using WinForms = System.Windows.Forms;
using System.Drawing;      // Requires reference to System.Drawing

namespace MediaMote
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        private WinForms.NotifyIcon _notifyIcon;
        private MainWindow _mainWindow;
        private bool _exitRequested = false;

        /// <summary>
        /// Handles application startup by initializing the tray icon.
        /// </summary>
        private void Application_Startup(object sender, StartupEventArgs e)
        {
            // Create the tray icon.
            _notifyIcon = new WinForms.NotifyIcon
            {
                // Use an icon file placed in your project (set its "Copy to Output Directory" property appropriately)
                Icon = new Icon("app.ico"),
                Text = "MediaMote",
                Visible = true
            };

            // Build the context menu for the tray icon.
            var contextMenu = new WinForms.ContextMenuStrip();
            var openMenuItem = new WinForms.ToolStripMenuItem("Open");
            openMenuItem.Click += (s, args) => ShowMainWindow();
            var exitMenuItem = new WinForms.ToolStripMenuItem("Exit");
            exitMenuItem.Click += (s, args) => ExitApplication();
            contextMenu.Items.Add(openMenuItem);
            contextMenu.Items.Add(exitMenuItem);
            _notifyIcon.ContextMenuStrip = contextMenu;

            // Optional: Open the window when the tray icon is double-clicked.
            _notifyIcon.DoubleClick += (s, args) => ShowMainWindow();

            // Do not show the MainWindow automatically.
        }

        /// <summary>
        /// Creates and shows the MainWindow if not already visible.
        /// </summary>
        private void ShowMainWindow()
        {
            if (_mainWindow == null)
            {
                _mainWindow = new MainWindow();
                _mainWindow.Closing += MainWindow_Closing;
            }
            if (_mainWindow.Visibility != Visibility.Visible)
            {
                _mainWindow.Show();
            }
            else
            {
                _mainWindow.Activate();
            }
        }

        /// <summary>
        /// When the MainWindow is requested to close (for example via the close button), cancel the closing
        /// and hide the window instead.
        /// </summary>
        private void MainWindow_Closing(object sender, System.ComponentModel.CancelEventArgs e)
        {
            if (!_exitRequested)
            {
                e.Cancel = true; // Cancel closing.
                _mainWindow.Hide();
            }
        }

        /// <summary>
        /// Exits the application when the tray's Exit menu item is clicked.
        /// </summary>
        private void ExitApplication()
        {
            _exitRequested = true;
            // Close the main window if it exists.
            if (_mainWindow != null)
            {
                _mainWindow.Close();
            }
            // Clean up the tray icon.
            _notifyIcon.Visible = false;
            _notifyIcon.Dispose();
            Shutdown();
        }

        /// <summary>
        /// Ensures the notify icon is disposed when the application exits.
        /// </summary>
        private void Application_Exit(object sender, ExitEventArgs e)
        {
            if (_notifyIcon != null)
            {
                _notifyIcon.Visible = false;
                _notifyIcon.Dispose();
            }
        }
    }
}
