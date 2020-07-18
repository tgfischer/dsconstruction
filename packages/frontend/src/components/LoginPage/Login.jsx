import React from "react";
import { Formik } from "formik";

import { Page } from "components/Page";
import { schema } from "./constants";
import { useLogin } from "./hooks";
import { LoginForm } from "./LoginForm";

const Login = () => {
  const { isLoading, handleLogin } = useLogin();
  return (
    <Page>
      <Formik
        onSubmit={handleLogin}
        initialValues={{ email: "", password: "" }}
        validationSchema={schema}
        validateOnMount
      >
        {formik => <LoginForm {...formik} isLoading={isLoading} />}
      </Formik>
    </Page>
  );
};

export default Login;
