import { usePostRequest } from "hooks/useRequest";
import { useHomePage } from "components/HomePage";
import { endpoints } from "constants/api";

export const useHomePageSettings = () => {
  const { masthead, about, isLoaded } = useHomePage();
  const [{ isLoading: isSubmitting }, handleSubmit] = usePostRequest(
    {
      url: `${endpoints.backend}/home`
    },
    {
      successMessage: "Saved the settings successfully",
      errorMessage: "Failed to save the settings"
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
