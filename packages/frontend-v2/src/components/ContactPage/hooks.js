import { useEffect } from "react";

import { useGetRequest } from "hooks/useRequest";
import { endpoints } from "constants/api";

export const useContactPage = () => {
  const [{ data, isLoaded }, fetchContact] = useGetRequest({
    url: `${endpoints.backend}/contact`
  });
  useEffect(() => void fetchContact(), [fetchContact]);
  return {
    contact: data?.contact ?? {},
    isLoaded,
    fetchContact
  };
};
