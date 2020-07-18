import Joi from "joi";

export const update = Joi.object()
  .keys({
    masthead: Joi.object()
      .keys({
        background: Joi.string().required(),
        header: Joi.string().required(),
        subHeader: Joi.string().required()
      })
      .required(),
    about: Joi.string().required(),
    services: Joi.object()
      .keys({
        header: Joi.string().required(),
        subHeader: Joi.string().required()
      })
      .required()
  })
  .required();
