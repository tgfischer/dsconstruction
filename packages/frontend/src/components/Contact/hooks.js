import { useEffect } from "react";
import { useFormState } from "react-use-form-state";
import get from "lodash/get";

import useRequest from "../../hooks/useRequest";
import { endpoints } from "../../constants";

export const useContactForm = () => {
  const [, input] = useFormState();
  const [, handleSubmit] = useRequest(() => ({
    method: "POST",
    url: `${endpoints.backend}/contact`
  }));
  return {
    input,
    handleSubmit: handleSubmit,
    isLoading: false
  };
};

export const useContactInfo = () => {
  const [{ data, isLoading }, getContactInfo] = useRequest(() => ({
    method: "GET",
    url: `${endpoints.backend}/contact`
  }));

  useEffect(() => void getContactInfo(), []);
  return [get(data, "info") || { phoneNumbers: [], address: {} }, isLoading];
};
