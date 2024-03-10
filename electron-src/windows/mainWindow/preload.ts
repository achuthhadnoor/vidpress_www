/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { contextBridge, ipcRenderer } from "electron";
import { IpcRendererEvent } from "electron/main";

// We are using the context bridge to securely expose NodeAPIs.
// Please note that many Node APIs grant access to local system resources.
// Be very cautious about which globals and APIs you expose to untrusted remote content.
contextBridge.exposeInMainWorld("electron", {
  compressVideo: (options: any) => ipcRenderer.send("compress-video", options),
  receiveFiles: (handler: (event: IpcRendererEvent, ...args: any[]) => void) =>
    ipcRenderer.on("files", handler),
  stopReceivingFiles: (
    handler: (event: IpcRendererEvent, ...args: any[]) => void
  ) => ipcRenderer.removeListener("files", handler),
  updateOptions: (options: any) => ipcRenderer.send("update-options", options),
});
