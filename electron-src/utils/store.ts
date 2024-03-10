import Store from "electron-store";
import log from "./logger";
import vidpress from "./vidpress";

export const store = new Store();

export const loadAppData = () => {
  // ? only un comment to clear the data including licence
  // store.set("vidpress-settings", vidpress.state.settings);
  // store.set("vidpress-user", vidpress.state.user);

  if (store.get("vidpress-user")) {
    const userData: any = store.get("vidpress-user") ?? null;
    vidpress.user = userData ?? null;
  } else {
    store.set("vidpress-user", vidpress.user);
  }
  if (store.get("vidpress-settings")) {
    vidpress.settings = store.get("vidpress-settings");
  } else {
    store.set("vidpress-settings", vidpress.settings);
  }
  log.info(
    "loadAppData ==>",
    JSON.stringify(vidpress.user),
    JSON.stringify(vidpress.settings)
  );
};

export const updateStoreSettings = (settings: any) => {
  store.set("vidpress-settings", settings);
};
