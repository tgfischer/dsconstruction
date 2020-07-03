import Joi from "joi";

export const sendEmail = Joi.object()
  .keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    message: Joi.string().required(),
    "g-recaptcha-response": Joi.string().required()
  })
  .required();

export const updatePhoneNumbers = Joi.object()
  .keys({
    phoneNumbers: Joi.array()
      .items(
        Joi.object()
          .keys({
            name: Joi.string().required(),
            number: Joi.number()
              .integer()
              .positive()
              .required()
          })
          .required()
      )
      .required()
  })
  .required();

export const updateContact = Joi.object()
  .keys({
    address: Joi.object()
      .keys({
        street: Joi.string().required(),
        city: Joi.string().required(),
        province: Joi.string().required(),
        postalCode: Joi.string().required()
      })
      .required(),
    email: Joi.string()
      .email()
      .required()
  })
  .required();
