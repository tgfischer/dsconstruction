import { useState, useEffect } from "react";
import { useFormState } from "react-use-form-state";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useSnackbar } from "notistack";

import useRequest from "../../hooks/useRequest";
import { endpoints } from "../../constants";

export const useContactForm = () => {
  const [state, setState] = useState({});
  const [{ values }, input] = useFormState({});
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { enqueueSnackbar } = useSnackbar();
  const [{ data, error, isLoading }, handleSubmit] = useRequest(
    data => ({
      method: "POST",
      url: `${endpoints.backend}/contact`,
      data
    }),
    () =>
      enqueueSnackbar("Your email was sent successfully", {
        variant: "success"
      })
  );

  useEffect(() => {
    executeRecaptcha("contact").then(token => {
      setState({ "g-recaptcha-response": token });
    });
  }, [data, error]);

  return {
    input,
    handleSubmit: e => {
      e.preventDefault();
      handleSubmit({ ...values, ...state });
    },
    isLoading
  };
};
