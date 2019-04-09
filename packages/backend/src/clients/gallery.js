import dynamoose from "dynamoose";
import uuid from "uuid/v4";
import _ from "lodash";

import Gallery from "../models/Gallery";

export const get = async ({ size, page, tags = [] }) => {
  const photos = await Gallery.scan().exec();
  const filtered =
    tags.length === 0
      ? photos
      : _.filter(photos, photo => _.intersection(photo.tags, tags).length > 0);
  const sorted = _.sortBy(filtered, photo => photo.createdAt);
  const paged = _.take(_.drop(sorted, page * size), size);
  return {
    photos: paged,
    count: filtered.length
  };
};

export const add = async photos => {
  await Gallery.batchPut(
    photos.map(({ original }) => ({
      id: uuid(),
      original,
      thumbnail: original,
      tags: [],
      createdAt: new Date()
    }))
  );
  return get({});
};

export const destroy = async photos => {
  await Gallery.batchDelete(photos.map(id => ({ id })));
  return get({});
};

export const toggleTags = async ({ photos: ids, add, remove }) => {
  const photos = await Gallery.batchGet(ids.map(id => ({ id })));
  await dynamoose.transaction(
    photos.map(photo =>
      Gallery.transaction.update(
        {
          id: photo.id
        },
        {
          tags: _.uniq([
            ..._.remove(photo.tags, tag => !remove.includes(tag)),
            ...add
          ])
        },
        { allowEmptyArray: true }
      )
    )
  );

  return get({});
};
