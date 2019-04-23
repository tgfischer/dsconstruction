import Joi from "joi";

export const add = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
});

export const destroy = Joi.array().items(
  Joi.string()
    .guid({ version: ["uuidv4"] })
    .required()
);
