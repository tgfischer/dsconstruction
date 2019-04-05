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
