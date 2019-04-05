import dynamoose from "dynamoose";
import uuid from "uuid/v4";

import Gallery from "../models/Gallery";

export const get = async ({ size }) =>
  Gallery.scan()
    .limit(size)
    .exec();

export const add = async photos => {
  await Promise.all(
    photos.map(async ({ original }) => {
      const gallery = new Gallery({
        id: uuid(),
        original,
        thumbnail: original,
        tags: [],
        createdAt: new Date()
      });
      await gallery.save();
    })
  );
  return get();
};

export const destroy = async photos => {
  await dynamoose.transaction(
    photos.map(id => Gallery.transaction.delete({ id }))
  );
  return get();
};
