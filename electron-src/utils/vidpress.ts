import { Menu, MenuItemConstructorOptions, Tray, nativeImage } from "electron";
import { hostname } from "os";
import "../windows/load";
import windowManager from "../windows/windowManager";
// import { loadAppData } from "./store";

type User = {
  email: string;
  license: string;
  hostname: string;
};

class Vidpress {
  user: User | null = null;
  tray: Tray | null = null;
  files?: string[];
  settings: any;
  isRendering: boolean = true;

  init = () => {
    // loadAppData();
    this.user = this.getUser();
    if (this.user) {
      this.prepareTray();
      this.prepareWindow();
    } else {
      this.prepareOnboard();
    }
  };

  getUser = () => ({
    email: "hey@achuth.dev",
    license: "ADMIN",
    hostname: hostname(),
  });

  prepareOnboard = () => {};

  prepareTray = () => {
    this.tray = new Tray(nativeImage.createEmpty());
    this.tray.setTitle("⇩");
    this.tray.setToolTip("Vidpress | Drop the file to compress");
    this.tray.on("drop-files", (_, files) => {
      console.log(JSON.stringify(files));
      console.log("====================================");
      if (files.length > 0) {
        this.trayDropFiles(files);
        this.openTray();
      }
    });
    this.tray.on("click", () => {
      this.openTray();
    });
  };
  openTray = () => {
    const template: MenuItemConstructorOptions[] = [
      {
        label: "Start Compression",
      },
      {
        type: "separator",
      },
      {
        role: "quit",
      },
    ];
    const contextMenu: any = Menu.buildFromTemplate(template);
    this.tray?.popUpContextMenu(contextMenu);
  };
  prepareWindow = () => {
    windowManager.main?.open(this.files);
  };

  trayDropFiles = (files: string[]) => {
    this.files = files;
    this.prepareWindow();
  };
  setOptions = (options: any) => {
    console.log("====================================");
    console.log(options);
    console.log("====================================");
  };
}

export default new Vidpress();
