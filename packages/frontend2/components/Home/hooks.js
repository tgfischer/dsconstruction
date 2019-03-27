import { useEffect } from "react";
import { useResource } from "react-request-hook";
import get from "lodash/get";

import { endpoints } from "../../constants";

export const useHome = () => {
  const [{ data, isLoading }, getHome] = useResource(() => ({
    method: "GET",
    url: `${endpoints.backend}/home`
  }));

  useEffect(() => void getHome(), []);
  const home = get(data, "home") || { masthead: {} };
  return [home, isLoading];
};
