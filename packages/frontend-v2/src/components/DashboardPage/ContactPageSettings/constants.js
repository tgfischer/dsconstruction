import * as yup from "yup";

export const schema = yup
  .object({
    name: yup.string().required(),
    number: yup.number().integer().positive().required()
  })
  .required();
