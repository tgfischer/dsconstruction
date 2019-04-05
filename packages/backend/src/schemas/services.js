import Joi from "joi";

export const add = Joi.object()
  .keys({
    name: Joi.string().required()
  })
  .required();

export const destroy = Joi.array()
  .items(Joi.string().required())
  .required();
