import Joi from "joi";

export const get = Joi.object()
  .keys({
    size: Joi.number().integer(),
    page: Joi.number()
      .integer()
      .required(),
    tag: Joi.string()
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
    tags: Joi.array()
      .items(Joi.string())
      .required()
  })
  .required();

export const urlSchema = Joi.object().keys({
  files: Joi.array()
    .items(Joi.string().required())
    .required()
});
