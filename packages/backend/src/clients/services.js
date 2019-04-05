import dynamoose from "dynamoose";
import uuid from "uuid/v4";

import Service from "../models/Service";

export const getAll = async () => Service.scan().exec();

export const add = async ({ name }) => {
  const service = new Service({
    id: uuid(),
    name
  });
  await service.save();
  return getAll();
};

export const destroy = async services => {
  await dynamoose.transaction(
    services.map(id => Service.transaction.delete({ id }))
  );
  return getAll();
};
