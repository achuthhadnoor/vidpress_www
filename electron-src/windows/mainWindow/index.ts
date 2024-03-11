import { BrowserWindow, app, ipcMain } from "electron";
import windowManager from "../windowManager";
import { is } from "electron-util";
import { format } from "url";
import { join } from "path";
import vidpress from "../../utils/vidpress";

let mainWindow: BrowserWindow | null;
let files: string[] = [];
const openWindow = (dropFiles?: string[]) => {
  if (dropFiles) {
    files = dropFiles;
    mainWindow?.webContents.send("files", files);
  }
  if (!mainWindow) {
    mainWindow = new BrowserWindow({
      height: 600,
      width: 800,
      transparent: true,
      frame: false,
      titleBarStyle: "hiddenInset",
      vibrancy: "sidebar",
      skipTaskbar: true,
      show: false,
      webPreferences: {
        nodeIntegration: true,
        allowRunningInsecureContent: true,
        preload: join(__dirname, "./preload.js"),
        devTools: true,
      },
    });
    const url = is.development
      ? "http://localhost:8000"
      : format({
          pathname: join(__dirname, "../../renderer/out/index.html"),
          protocol: "file:",
          slashes: true,
        });
    mainWindow.loadURL(url);
    // mainWindow.webContents.openDevTools();
    mainWindow.addListener("ready-to-show", () => {
      console.log("====================================");
      console.log("ready", files);
      console.log("====================================");
      app.dock && app.dock.show();
    });
  } else {
    mainWindow.show();
    mainWindow.webContents.openDevTools();
  }
};
const hideWindow = () => {
  mainWindow?.hide();
};
ipcMain.on("message", (event) => {
  console.log("====================================");
  console.log("hello from main");
  console.log("====================================");
  event.sender.send("message", vidpress.files);
});

windowManager.setMainWindow({
  open: openWindow,
  hideWindow: hideWindow,
});
