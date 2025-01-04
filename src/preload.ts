// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer, webUtils } from "electron";

// Expose protected methods that allow the renderer process to use

contextBridge.exposeInMainWorld("api", {
  getPathForFile: (file: File) => webUtils.getPathForFile(file),
  send: (channel: string, data: any) => {
    // whitelist channels
    console.log("channel", channel);
    const validChannels = ["compress"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel: string, func: any) => {
    const validChannels = ["fromMain"];
    if (validChannels.includes(channel)) {
      // Deliberately strip event
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
});
