const { app, shell } = require('electron');
const path = require('path');
const { fork } = require('child_process');

app.whenReady().then(() => {
  // Start your Node.js server
  fork(path.join(__dirname, 'server.js'));

  // Open the system default browser to your app
  shell.openExternal('http://localhost:3000');

  // Quit the Electron process since we don't need a window
  /* app.quit(); */
});
