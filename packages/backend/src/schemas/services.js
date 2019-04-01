import Joi from "joi";

export const add = Joi.object()
  .keys({
    name: Joi.string().required(),
    blurb: Joi.string().required(),
    description: Joi.string().required()
  })
  .required();

export const edit = Joi.object()
  .keys({
    id: Joi.string().required(),
    name: Joi.string().required(),
    blurb: Joi.string().required(),
    description: Joi.string().required(),
    thumbnail: Joi.string().required(),
    to: Joi.string().required()
  })
  .required();

export const destroy = Joi.array()
  .items(Joi.string().required())
  .required();
