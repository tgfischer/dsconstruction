import * as yup from "yup";

export const schema = yup
  .object({
    firstName: yup.string().required("You must enter a first name"),
    lastName: yup.string().required("You must enter a last name"),
    email: yup
      .string()
      .email("You must enter a valid email")
      .required("You must enter a valid email"),
    password: yup.string().required("You must enter a password")
  })
  .required();
