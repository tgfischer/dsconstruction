import * as yup from "yup";

export const schema = yup
  .object()
  .shape({
    firstName: yup.string().required("You must enter your first name"),
    lastName: yup.string().required("You must enter your last name"),
    email: yup
      .string()
      .email("You must enter a valid email")
      .required("You must enter your email"),
    message: yup
      .string()
      .required("You must enter a message that you want to send"),
    "g-recaptcha-response": yup.string().required()
  })
  .required();
