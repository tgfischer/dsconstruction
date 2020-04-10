import AWS from "aws-sdk";
import uuid from "uuid/v4";
import _ from "lodash";

import Gallery from "../models/Gallery";
import Tag from "../models/Tag";
import { encodeS3URI } from "../utils";

const getS3Bucket = () => new AWS.S3();

export const get = async ({ size, page, tag }) => {
  const photos = await Gallery.scan().exec();
  const filtered = !tag
    ? photos
    : _.filter(photos, photo => _.intersection(photo.tags, [tag]).length > 0);
  const sorted = _.orderBy(filtered, photo => photo.createdAt, ["desc"]);
  const paged = _.take(_.drop(sorted, page * size), size);
  return {
    photos: paged,
    count: filtered.length
  };
};

export const add = async photos => {
  await Gallery.batchPut(
    photos.map(({ original }) => {
      const key = encodeS3URI(original.split(".")[0]);
      return {
        id: uuid(),
        original: key,
        thumbnail: "/thumbnails" + key,
        tags: [],
        createdAt: new Date()
      };
    })
  );
  return get({});
};

export const destroy = async photos =>
  Gallery.batchDelete(photos.map(id => ({ id })));

export const toggleTags = async ({ photos: ids, add, remove }) => {
  const photos = await Gallery.batchGet(ids.map(id => ({ id })));
  await Promise.all(
    photos.map(photo =>
      Gallery.update(
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

export const getSignedUrl = files =>
  files.map(file => ({
    url: getS3Bucket().getSignedUrl("putObject", {
      Bucket: process.env.DSC_BUCKET_NAME,
      Key: encodeS3URI(file.split(".")[0]),
      Expires: 60 * 5,
      ACL: "public-read"
    }),
    file
  }));
