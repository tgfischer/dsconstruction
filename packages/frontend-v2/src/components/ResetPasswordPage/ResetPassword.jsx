import React from "react";
import { Formik } from "formik";

import { Page } from "components/Page";
import { schema } from "./constants";
import { useResetPassword } from "./hooks";
import { ResetPasswordForm } from "./ResetPasswordForm";

const ResetPassword = () => {
  const { isLoading, handleResetPassword } = useResetPassword();
  return (
    <Page>
      <Formik
        onSubmit={handleResetPassword}
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={schema}
        validateOnMount
      >
        {formik => <ResetPasswordForm {...formik} isLoading={isLoading} />}
      </Formik>
    </Page>
  );
};

export default ResetPassword;
