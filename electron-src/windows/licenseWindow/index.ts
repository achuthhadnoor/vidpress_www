import { BrowserWindow, app } from "electron";
import windowManager from "../windowManager";
import { is } from "electron-util";
import { format } from "url";
import { join } from "path";

let mainWindow: BrowserWindow | null;
let files: string[] = [];
const openWindow = (dropFiles?: string[]) => {
  if (dropFiles) {
    files = dropFiles;
  }
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    transparent: true,
    frame: false,
    titleBarStyle: "hiddenInset",
    vibrancy: "sidebar",
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: true,
      preload: join(__dirname, "./preload.js"),
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
  mainWindow.webContents.openDevTools({ mode: "detach" });
  mainWindow.addListener("ready-to-show", () => {
    console.log("====================================");
    console.log("ready", files);
    console.log("====================================");
    app.dock && app.dock.show();
  });
};

windowManager.setLicenseWindow({
  open: openWindow,
});
