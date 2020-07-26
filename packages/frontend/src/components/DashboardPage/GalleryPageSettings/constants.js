import * as yup from "yup";

export const schema = yup
  .object({
    name: yup.string().required("You must enter a category name")
  })
  .required();
