import { useEffect } from "react";
import { useFormikContext } from "formik";
import { useHistory } from "react-router-dom";

import { useGetRequest, usePostRequest } from "hooks/useRequest";
import { endpoints } from "constants/api";

export const useContactPage = () => {
  const { push } = useHistory();
  const [{ data, isLoaded }, fetchContact] = useGetRequest({
    url: `${endpoints.backend}/contact`
  });
  const [{ isLoading: isSubmitting }, executeSendEmail] = usePostRequest(
    {
      url: `${endpoints.backend}/contact`
    },
    {
      successMessage:
        "Sent the email successfully. We'll get back to you shortly!",
      errorMessage: "Failed to send the email"
    }
  );
  useEffect(() => void fetchContact(), [fetchContact]);
  return {
    contact: data?.contact ?? {},
    isLoaded,
    isSubmitting,
    fetchContact,
    handleSendEmail: data =>
      executeSendEmail({ data }).then(() => push("/contact/success"))
  };
};

export const useContactPageForm = () => {
  const { setFieldValue } = useFormikContext();
  return {
    handleReCaptcha: value => setFieldValue("g-recaptcha-response", value)
  };
};
