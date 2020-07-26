import * as yup from "yup";

export const contactSettingsSchema = yup
  .object({
    street: yup.string().required("You must enter a street name"),
    city: yup.string().required("You must enter a city"),
    province: yup.string().required("You must enter a province"),
    postalCode: yup.string().required("You must enter a postal code"),
    email: yup
      .string()
      .email("You must enter a valid email")
      .required("You must enter a valid email")
  })
  .required();

export const addNumberSchema = yup
  .object({
    name: yup.string().required("You must enter someone's full name"),
    number: yup
      .number()
      .integer("You must enter a valid phone number")
      .positive("You must enter a valid phone number")
      .required("You must enter a valid phone number")
  })
  .required();
