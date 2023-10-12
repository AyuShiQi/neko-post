import { app, BrowserWindow, session } from "electron";
import { CustomScheme } from "./CustomScheme";
import { CommonWindowEvent } from "./CommonWindowEvent";
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
export let mainWindow: BrowserWindow;

/**
 * app为electron全局对象，当electron初始化好后，触发ready事件
 */
app.commandLine.appendSwitch('disable-web-security');
app.whenReady().then(() => {
  let config = {
    show: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      contextIsolation: false,
      webviewTag: true,
      spellcheck: false,
      disableHtmlFullscreenWindowResize: true,
    }
  };
  // 创建一个主窗口
  mainWindow = new BrowserWindow(config);
  // 开发环境
  // 2保存的是进程的开启端口
  if (process.argv[2]) {
    console.log(process.argv)
    mainWindow.loadURL(process.argv[2]);
    // devTools
    mainWindow.webContents.openDevTools({ mode: "undocked" });
  // 生产环境
  } else {
    CustomScheme.registerScheme();
    // 这个用来加载本地文件
    // mainWindow.loadFile()
    // 这个用来加载一个外链地址
    mainWindow.loadURL(`app://index.html`);
  }

  // 设置代理 
  session.defaultSession.setProxy({
    mode: 'fixed_servers',
    proxyRules: 'http=http://127.0.0.1:3000;https=http://127.0.0.1:3000'
  }).then(() => {
    console.log(session.defaultSession)
    mainWindow.webContents.session.setProxy({
      mode: 'fixed_servers',
      proxyRules: 'http=http://127.0.0.1:3000;https=http://127.0.0.1:3000',
    }).then(() => {
      console.log(mainWindow.webContents.session)
    })
  })
  CommonWindowEvent.listen();
})

// 监听相关事件
app.on("browser-window-created", (e, win) => {
  console.log(e)
  CommonWindowEvent.regWinEvent(win);
});