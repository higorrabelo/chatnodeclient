const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const host = 'http://localhost:3030/';
const io = require('socket.io-client')
const socket = io(host);

const options = {
  type:'info',
  buttons:['OK','Cancel'],
  defaultId:0,
  title:"Mensagem Teste",
  message:"Mensagem Teste de Dialog"

}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}


const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1240,
    height: 800,
    frame:false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  ipcMain.handle("quit",()=>{
    app.quit();
  })
  ipcMain.handle("maximize",()=>{
    mainWindow.maximize();
  })
  ipcMain.handle("minimize",()=>{
    mainWindow.minimize();
  })
  ipcMain.handle("msg",(err, mensagem)=>{
    //console.log(mensagem)
    envio(mensagem)
  })

};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

function avisoPersonalizado(mensagem){
  options.message=mensagem;
    dialog.showMessageBox(null, options).then(resp=>{
      //console.log(resp)
    })
}

function envio(mensagem){
    socket.emit('receber',mensagem)
}

socket.on("escrever",mensagem=>{
  console.log("Retornado: "+mensagem)
  socket.emit("resposta",mensagem);
})