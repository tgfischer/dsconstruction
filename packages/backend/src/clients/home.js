import * as settingsClient from "./settings";

export const get = async () => {
  const home = await settingsClient.get("home");
  return home;
};

export const update = async body => settingsClient.update("home", body);
