import uuid from "uuid/v4";

import Tag from "../models/Tag";

export const getAll = async () => Tag.scan().exec();

export const add = async ({ name }) => {
  const tag = new Tag({
    id: uuid(),
    name
  });
  await tag.save();
  return getAll();
};

export const destroy = async ({ id }) => {
  await Tag.delete({ id });
  return getAll();
};
