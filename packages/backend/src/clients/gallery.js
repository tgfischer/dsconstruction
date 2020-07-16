import AWS from "aws-sdk";
import uuid from "uuid/v4";
import _ from "lodash";

import Gallery from "../models/Gallery";
import { encodeS3URI } from "../utils";

const getS3Bucket = () => new AWS.S3();

export const get = async ({ size, page, tag }) => {
  const photos = await Gallery.scan().exec();
  const filtered = !tag
    ? photos
    : _.filter(photos, photo => _.intersection(photo.tags, [tag]).length > 0);
  const sorted = _.orderBy(filtered, photo => photo.createdAt, ["desc"]);
  const paged = _.isNil(size)
    ? sorted
    : _.take(_.drop(sorted, page * size), size);
  return {
    photos: paged.map(({ original, thumbnail, ...photo }) => ({
      ...photo,
      original: `https://s3.ca-central-1.amazonaws.com/${process.env.DSC_PHOTOS_BUCKET_NAME}${original}.jpeg`,
      thumbnail: `https://s3.ca-central-1.amazonaws.com/${process.env.DSC_PHOTOS_BUCKET_NAME}${thumbnail}.jpeg`
    })),
    count: filtered.length
  };
};

export const getSignedUrl = async () => {
  const id = encodeS3URI(uuid());
  return {
    id,
    url: getS3Bucket().getSignedUrl("putObject", {
      Bucket: process.env.DSC_BUCKET_NAME,
      Key: "gallery/" + id,
      Expires: 60 * 5,
      ACL: "public-read"
    })
  };
};

export const add = async ({ id }) => {
  const key = "gallery/" + id;
  await Gallery.create({
    id,
    original: "/" + key,
    thumbnail: "/thumbnails/" + key,
    tags: [],
    createdAt: new Date()
  });
};

export const destroy = async photos =>
  Gallery.batchDelete(photos.map(id => ({ id })));

export const toggleTags = async ({ photos: ids, tags }) => {
  const photos = await Gallery.batchGet(ids.map(id => ({ id })));
  await Promise.all(
    photos.map(photo =>
      Gallery.update({ id: photo.id }, { tags }, { allowEmptyArray: true })
    )
  );

  return get({});
};
