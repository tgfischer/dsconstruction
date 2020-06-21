import { useEffect } from "react";

import { useGetRequest } from "hooks/useRequest";
import { endpoints } from "constants/api";

export const useHome = () => {
  const [request, fetchHome] = useGetRequest({
    url: `${endpoints.backend}/home`
  });
  useEffect(() => void fetchHome(), [fetchHome]);
  return request;
};

export const useMasthead = ({ background }) => ({
  getMastheadProps: () => ({
    className: "ds-masthead",
    style: {
      background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${background}) no-repeat center center / cover`
    }
  })
});
