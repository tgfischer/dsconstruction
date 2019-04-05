import dynamoose from "dynamoose";
import uuid from "uuid/v4";

import Service from "../models/Service";

export const getAll = async () => Service.scan().exec();

export const add = async ({ name, blurb, description, thumbnail }) => {
  const service = new Service({
    id: uuid(),
    name,
    blurb,
    description,
    thumbnail,
    to: "/services"
  });
  await service.save();
  return getAll();
};

export const edit = async ({ id, name, blurb, thumbnail, description }) => {
  await Service.update({
    id,
    name,
    blurb,
    description,
    thumbnail,
    to: "/services"
  });
  return getAll();
};

export const destroy = async services => {
  await dynamoose.transaction(
    services.map(id => Service.transaction.delete({ id }))
  );
  return getAll();
};
