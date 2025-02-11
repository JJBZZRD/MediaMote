using System;
using System.Windows;

namespace MediaMote
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            // Removed duplicate WebServerService initialization
            // The server is now started in App.xaml.cs on application startup.
        }
    }
}