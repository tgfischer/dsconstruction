import { useFormState } from "react-use-form-state";

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
