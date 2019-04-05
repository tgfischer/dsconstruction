import Joi from "joi";

export const uploadSchema = Joi.object().keys({
  files: Joi.array()
    .items(Joi.string().required())
    .required()
});
