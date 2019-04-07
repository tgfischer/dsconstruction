import Joi from "joi";

export const add = Joi.object()
  .keys({
    name: Joi.string().required()
  })
  .required();

export const destroy = Joi.object()
  .keys({
    id: Joi.string().required()
  })
  .required();
