import * as settingsClient from "./settings";
import * as servicesClient from "./services";
import * as galleryClient from "./gallery";

export const get = async () => {
  const home = await settingsClient.get("home");
  return home;
};

export const update = async body => settingsClient.update("home", body);
