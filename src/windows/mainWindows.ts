import { BrowserWindow, ipcMain } from "electron";
import { hostname, platform } from "os";
import { windowManager } from "./windowManager";
import isDev from "electron-is-dev";
import log from "../utils/logger";
import { join } from "path";

let window: BrowserWindow | null = null,
  isOpen = false;

const createBrowserWindow = () => {
  close();
  window = new BrowserWindow({
    height: 570,
    width: 400,
    fullscreen: false,
    resizable: false,
    frame: false,
    transparent: platform() === "darwin" ? true : false,
    vibrancy: "sidebar",
    titleBarStyle: "customButtonsOnHover",
    trafficLightPosition: { x: 16, y: 16 },
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: true,
      preload: join(__dirname, "preload.js"),
    },
  });
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    window.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    window.loadFile(
      join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }
  isDev && window.webContents.openDevTools({ mode: "detach" });
  isOpen = true;
};

const close = () => {
  window?.close();
};

const windowOpenCheck = () => isOpen;

ipcMain.handle("get-hostname", (_e, _args) => {
  log.info(hostname());
  return hostname();
});

export default windowManager.setMainWindow({
  open: createBrowserWindow,
  close,
  isOpen: windowOpenCheck,
});
