// Packages
import { app } from "electron";
import prepareNext from "electron-next";
import vidpress from "./utils/vidpress";
import { checkIfAppIsOpen } from "./utils";
import { checkUpdates } from "./utils/updater";
import windowManager from "./windows/windowManager";
// Prepare the renderer once the app is ready
checkIfAppIsOpen();
checkUpdates();
app.on("ready", async () => {
  await prepareNext("./renderer");
  vidpress.init();
});

app.on("window-all-closed", () => {
  // do not quit app
  windowManager.main?.hideWindow();
  app.dock && app.dock.hide();
});
app.on("before-quit", () => {
  if (vidpress.isRendering) {
  } else {
    app.quit();
  }
});
