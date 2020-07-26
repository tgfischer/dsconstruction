import * as yup from "yup";

export const schema = yup
  .object({
    header: yup.string().required("You must enter a website header"),
    subHeader: yup.string().required("You must enter a website subheader"),
    about: yup
      .string()
      .required("You must enter a brief description of the company"),
    servicesHeader: yup
      .string()
      .required("You must enter a header for the Services section"),
    servicesSubHeader: yup
      .string()
      .required("You must enter a subheader for the Services section")
  })
  .required();
