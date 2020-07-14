import * as yup from "yup";

export const schema = yup
  .object()
  .shape({
    password: yup
      .string()
      .min(8, "The password must be at least 8 characters long")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "The password must contain at least one uppercase character, one lowercase character, one special character, and one number"
      )
      .required("This field is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "The passwords do not match")
      .required("This field is required")
  })
  .required();
