const { app, BrowserWindow } = require('electron')    // Import the app and BrowserWindow modules from the electron package
const { startServer } = require('./src/server')       // Import the startServer function from the server module
const { handleData } = require('./src/dataHandler')   // Import the handleData function from the dataHandler module

function createWindow() {                          // Define a function called createWindow
    const win = new BrowserWindow({                   // Create a new BrowserWindow instance
        width: 800,                                     // Set the width to 800 pixels
        height: 600,                                    // Set the height to 600 pixels
        webPreferences: {                               // Set the webPreferences object
            nodeIntegration: true,                         // Enable nodeIntegration
            contextIsolation: false,                     // Disable contextIsolation
        },
    });

    win.loadFile('index.html')                        // Load the index.html file into the window

    const server = startServer();                      // Start the server and store the return value in a variable called server
    server.on('data', (data) => {                      // Listen for the 'data' event on the server   
        handleData.call(win.webContents, data);          // Call the handleData function with the data and the webContents of the window
    });
}

app.whenReady().then(createWindow);                 // Call the createWindow function when the app is ready

app.on('window-all-closed', () => {                 // Listen for the 'window-all-closed' event
    if (process.platform !== 'darwin') {               // Check if the platform is not macOS
        app.quit();                                     // Quit the app
    }
});

app.on('activate', () => {                          // Listen for the 'activate' event
    if (BrowserWindow.getAllWindows().length === 0) {  // Check if there are no windows open
        createWindow();                                 // Call the createWindow function
    }
});