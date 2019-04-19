import * as settingsClient from "./settings";
import * as servicesClient from "./services";
import * as galleryClient from "./gallery";

export const get = async () => {
  const home = await settingsClient.get("home");
  const services = await servicesClient.getAll();
  const gallery = await galleryClient.get({ size: 4 });
  return { ...home, services, gallery };
};

export const update = async body => settingsClient.update("home", body);
