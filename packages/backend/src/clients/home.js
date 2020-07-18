import * as settingsClient from "./settings";

export const get = async () => settingsClient.get("home");

export const update = async body => settingsClient.update("home", body);
