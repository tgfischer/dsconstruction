import Joi from "joi";

export const loginSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required()
});

export const resetTemporaryPasswordSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required(),
  firstName: Joi.string().allow(""),
  lastName: Joi.string().allow(""),
  session: Joi.string().required()
});
