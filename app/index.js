'use strict'
const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const fs = require('fs')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const isDev = process.env.NODE_ENV === 'development'

let config

if (isDev) {
    config = require('../build/config')
} else {
    config = {}
}
let webContents;
function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600})

    // and load the index.html of the app.
    const url = isDev ? `http://localhost:${config.port}` : `file://${__dirname}/dist/index.html`
    mainWindow.loadURL(url);

    // Open the DevTools.
    if (isDev) {
        mainWindow.webContents.openDevTools()

        const installExtension = require('electron-devtools-installer')
        installExtension.default(installExtension.VUEJS_DEVTOOLS)
            .then(name => console.log(`Added Extension:  ${name}`))
            .catch(err => console.log('An error occurred: ', err))
    }

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })

    webContents = mainWindow.webContents;
    mainWindow.webContents.on("did-finish-load", function() {
        // Use default printing options
        // webContents.print({silent:true})
        // mainWindow.webContents.printToPDF({}, function(error, data) {
        //     if (error) throw error;
        //     fs.writeFile("/tmp/print.pdf", data, function(error) {
        //         if (error)
        //             throw error;
        //         console.log("Write PDF successfully.");
        //     })
        // })
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

