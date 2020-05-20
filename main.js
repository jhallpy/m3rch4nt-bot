const { app, BrowserWindow, ipcMain, nativeImage, Menu } = require('electron');
const fs = require('fs');
const image = nativeImage.createFromPath(__dirname + '/resources/icon.png');
image.setTemplateImage(true);
var on = false;
//TODO: Split the main process. It may solve the issues in the bot itself. I think the main process can't handle the bot at the same time as itself.

function createWorkerWindow() {
  workerWindow = new BrowserWindow({
    show: false,
    webPreferences: {nodeIntegration: true}
  });
  workerWindow.loadFile('worker.html');
}
ipcMain.on('btnClick', ()=>{
  let $ = global.jQuery = require('./jquery-3.4.1.min.js');
  try{
    if(!on) {
      app.whenReady().then(createWorkerWindow);
      on = true;
    }
    else {
      workerWindow.close();
      on = false;
  }
}
  catch(err){
    console.log(err);
  }
});
app.on('ready', ()=>{
  mainWindow = new BrowserWindow({
    width: 400,
    height: 200,
    icon: image,
    webPreferences: { nodeIntegration: true }
  })
  // and load the index.html of the app.
  mainWindow.loadFile('index.html');

  mainWindow.on('close', () =>{
    app.quit();
  })
})
//app.whenReady().then(createMainWindow);

app.on('close', ()=>app.quit());
app.on('browser-window-created',function(e,window) {
  window.setMenu(null);
});
// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  })
if (!fs.existsSync('./perks.json')){
    let exec = require('child_process').exec;
    exec('node scraper.js',
    (error, stdout, stderr) =>{
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        if (error !== null){
            console.log(`exec error ${error}`);
        }
    })
}

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.