import { BrowserWindow, ipcMain, screen } from "electron";
import { hostname, platform } from "os";
import { windowManager } from "./windowManager";
import isDev from "electron-is-dev";
import log from "../utils/logger";
import { join } from "path";
import { exec } from "child_process";

let window: BrowserWindow | null = null,
  isOpen = false;
const isVerified = true;

const createBrowserWindow = () => {
  close();
  let height = 600,
    width = 400;
  if (height && width && isVerified) {
    height = screen.getPrimaryDisplay().workAreaSize.height * 0.6;
    width = screen.getPrimaryDisplay().workAreaSize.width * 0.6;
  }
  window = new BrowserWindow({
    height,
    width,
    fullscreen: false,
    resizable: false,
    frame: false,
    transparent: platform() === "darwin" ? true : false,
    vibrancy: "sidebar",
    titleBarStyle: "customButtonsOnHover",
    trafficLightPosition: { x: 16, y: 16 },
    visualEffectState: "active",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
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

  ipcMain.handle("resize-window", (_e, { width, height }) => {
    if (height && width && isVerizfied) {
      window?.setSize(width, height);
    } else {
      height = screen.getPrimaryDisplay().workAreaSize.height;
      width = screen.getPrimaryDisplay().workAreaSize.width;
      window?.setSize(width, height);
    }
  });

  ipcMain.on("compress", (_e, command) => {
    console.log("====================================");
    log.info(command);
    console.log("====================================");
    // execute ffmpeg command
    const ffmpegProcess = exec(`ffmpeg ${command}`);

    ffmpegProcess.stdout?.on("data", (data) => {
      log.info(`stdout: ${data}`);
    });

    ffmpegProcess.stderr?.on("data", (data) => {
      log.error(`stderr: ${data}`);
    });

    ffmpegProcess.on("close", (code) => {
      log.info(`child process exited with code ${code}`);
    });

    ffmpegProcess.on("error", (error) => {
      log.error(`error: ${error.message}`);
    });
  });
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
