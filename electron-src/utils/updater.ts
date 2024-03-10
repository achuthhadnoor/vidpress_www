import { app, dialog, net, shell } from "electron";
import { is } from "electron-util";
import { store } from "./store";
import vidpress from "./vidpress";

export const sendUpdateRequest = async (click: boolean) => {
  const url = is.development
    ? "http://localhost:3000/api/updates"
    : "https://getlapseapp.com/api/updates";
  const request = net.request(url);
  console.log("==> updates", "checking for updates");
  request.on("response", (response) => {
    let body = "";
    response.on("data", (chunk) => {
      body += chunk;
    });
    response.on("end", async () => {
      const data = JSON.parse(body);
      console.log(`Version: ${data.version}`);
      if (
        Number(app.getVersion().split(".").join()) <
        Number(data.version.split(".").join())
      ) {
        const { response } = await dialog.showMessageBox({
          type: "info",
          buttons: ["Download Updates", "Cancel"],
          defaultId: 0,
          message: "New Update available",
          detail: `You are on ${app.getVersion()}. Latest version ${
            data.version
          } is available`,
          cancelId: 1,
        });
        if (response === 0) {
          console.log("====================================");
          console.log(
            "==> updates",
            `https://getlapseapp.com/download?email=${vidpress.user?.email}&&code=${vidpress.user?.license}`
          );
          console.log("====================================");
          shell.openExternal(
            `https://getlapseapp.com/download?email=${vidpress.user?.email}&&code=${vidpress.user?.license}`
          );
        }
      } else {
        if (click) {
          console.log("==> updates", "same version");
          await dialog.showMessageBox({
            type: "info",
            buttons: ["ok"],
            defaultId: 0,
            message: "Lapse runs the latest version already",
          });
        }
      }
    });
  });
  request.on("error", (err) => {
    console.log("====================================");
    console.log("==> updates", err);
    console.log("====================================");
  });
  request.end();
};

export const checkUpdates = () => {
  const savedDate = store.get("vidpress-updateDate");
  const currentDate = new Date().toLocaleDateString();

  if (savedDate !== currentDate) {
    sendUpdateRequest(false);
    store.set("vidpress-updateDate", currentDate);
  }
};
