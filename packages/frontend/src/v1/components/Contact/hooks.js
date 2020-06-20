import { useState } from "react";
import { useFormState } from "react-use-form-state";
import { useSnackbar } from "notistack";

import useRequest from "../../hooks/useRequest";
import { endpoints } from "../../../constants";

export const useContactForm = () => {
  const [state, setState] = useState({});
  const [{ values }, input] = useFormState({});
  const { enqueueSnackbar } = useSnackbar();
  const [{ isLoading }, handleSubmit] = useRequest(
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

  return {
    input,
    handleRecaptcha: token => setState({ "g-recaptcha-response": token }),
    handleSubmit: e => {
      e.preventDefault();
      handleSubmit({ ...values, ...state });
    },
    isLoading
  };
};
