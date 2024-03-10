import AutoLaunch from "auto-launch";
import { app } from "electron";

export const autoLauncher = new AutoLaunch({
  name: "Lapse",
  path: "/Applications/Lapse.app",
});

export const checkIfAppIsOpen = () => {
  const gotTheLock = app.requestSingleInstanceLock();

  if (!gotTheLock) {
    app.quit();
  } else {
    app.on("second-instance", () => {
      app.focus();
    });
  }
};
