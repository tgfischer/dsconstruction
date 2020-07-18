import { usePostRequest } from "hooks/useRequest";
import { useHomePage } from "components/HomePage";
import { endpoints } from "constants/api";

export const useHomePageSettings = () => {
  const { masthead, about, services, isLoaded } = useHomePage();
  const [{ isLoading: isSubmitting }, handleSubmit] = usePostRequest(
    {
      url: `${endpoints.backend}/home`
    },
    {
      successMessage: "Saved the settings successfully",
      errorMessage: "Failed to save the settings",
      useAuthorization: true
    }
  );
  return {
    isLoaded,
    isSubmitting,
    initialValues: {
      header: masthead?.header,
      subHeader: masthead?.subHeader,
      about,
      servicesHeader: services?.header,
      servicesSubHeader: services?.subHeader
    },
    onSubmit: ({
      header,
      subHeader,
      about,
      servicesHeader,
      servicesSubHeader
    }) => {
      handleSubmit({
        data: {
          masthead: {
            ...masthead,
            header,
            subHeader
          },
          about,
          services: {
            header: servicesHeader,
            subHeader: servicesSubHeader
          }
        }
      });
    }
  };
};
