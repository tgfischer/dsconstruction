import Settings from "../models/Settings";
import * as constants from "../constants";

export const get = async id => {
  let settings = await Settings.queryOne("id")
    .eq(id)
    .exec();

  if (!settings) {
    settings = await set(id, constants.defaultSettings[id]);
  }

  return settings.value;
};

export const set = async (id, value) => {
  const settings = new Settings({
    id,
    value
  });
  await settings.save();
  return value;
};
