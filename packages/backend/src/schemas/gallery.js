import Joi from "joi";

export const get = Joi.object()
  .keys({
    size: Joi.number().integer()
  })
  .required();

export const add = Joi.array()
  .items(
    Joi.object()
      .keys({
        original: Joi.string().required()
      })
      .required()
  )
  .required();

export const destroy = Joi.array()
  .items(Joi.string().required())
  .required();

export const toggle = Joi.object()
  .keys({
    photos: Joi.array()
      .items(Joi.string().required())
      .required(),
    add: Joi.array()
      .items(Joi.string())
      .required(),
    remove: Joi.array()
      .items(Joi.string())
      .required()
  })
  .required();
