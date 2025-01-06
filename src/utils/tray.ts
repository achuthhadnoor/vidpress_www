import { app, Menu, nativeImage, Tray } from "electron";

let tray: Tray | null = null;

export function createTray() {
  if (tray) return;

  const iconPath =
    // path.join(__dirname, "assets", "tray-icon.png") ||
    nativeImage.createEmpty();
  tray = new Tray(iconPath);
  tray.setTitle("〄");
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Compress Video",
      click: () => {
        // Implement video compression logic here
      },
    },
    {
      label: "Compress Image",
      click: () => {
        // Implement image compression logic here
      },
    },
    { type: "separator" },
    {
      label: "Quit",
      click: () => {
        app.quit();
      },
    },
  ]);
  tray.setToolTip("Video and Image Compression App");
  tray.on("click", () => {
    tray.popUpContextMenu(contextMenu);
  });
  tray.on("drop-files", (event, files) => {
    // Implement file drop logic here
    const images = [];
    const videos = [];
  });
}
