import { useEffect } from "react";
import get from "lodash/get";

import useRequest from "../../hooks/useRequest";
import { endpoints } from "../../constants";

export const useHome = () => {
  const [{ data, isLoading }, getHome] = useRequest(() => ({
    method: "GET",
    url: `${endpoints.backend}/home`
  }));

  useEffect(() => void getHome(), []);
  return [get(data, "home") || { masthead: {} }, isLoading];
};
