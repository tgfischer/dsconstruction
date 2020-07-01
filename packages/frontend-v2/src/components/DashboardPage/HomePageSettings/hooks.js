import { useCallback } from "react";
import { useToasts } from "react-toast-notifications";

import { usePostRequest } from "hooks/useRequest";
import { useHomePage } from "components/HomePage";
import { endpoints } from "constants/api";

export const useHomePageSettings = () => {
  const { addToast } = useToasts();
  const { masthead, about, isLoaded } = useHomePage();
  const [{ isLoading: isSubmitting }, handleSubmit] = usePostRequest(
    {
      url: `${endpoints.backend}/home`
    },
    {
      onSuccess: useCallback(
        () =>
          addToast("Saved the settings successfully", {
            appearance: "success"
          }),
        [addToast]
      ),
      onError: useCallback(
        err =>
          addToast(`Failed to save the settings: ${err.message}`, {
            appearance: "error"
          }),
        [addToast]
      )
    }
  );
  return {
    isLoaded,
    isSubmitting,
    initialValues: {
      header: masthead?.header,
      subHeader: masthead?.subHeader,
      about
    },
    onSubmit: ({ header, subHeader, about }) => {
      handleSubmit({
        data: {
          masthead: {
            ...masthead,
            header,
            subHeader
          },
          about
        }
      });
    }
  };
};
