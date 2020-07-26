import * as yup from "yup";

export const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email("You must enter a valid email")
      .required("You must enter your email"),
    password: yup.string().required("You must enter your password")
  })
  .required();
