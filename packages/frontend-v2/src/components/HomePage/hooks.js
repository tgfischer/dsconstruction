import { useEffect } from "react";

import { useGetRequest } from "hooks/useRequest";
import { endpoints } from "constants/api";

export const useHome = () => {
  const [{ data, isLoading }, fetchHome] = useGetRequest({
    url: `${endpoints.backend}/home`
  });
  useEffect(() => void fetchHome(), [fetchHome]);
  return {
    masthead: data?.masthead,
    about: data?.about ?? "",
    isLoading
  };
};

export const useMasthead = ({ background }) => ({
  getMastheadProps: () => ({
    className: "ds-masthead vh-100 d-flex flex-column",
    style: {
      background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${background}) no-repeat center center / cover`
    }
  })
});

export const useServices = () => {
  const [{ data, isLoading }, fetchServices] = useGetRequest({
    url: `${endpoints.backend}/services`
  });
  useEffect(() => void fetchServices(), [fetchServices]);
  return { services: data?.services ?? [], isLoading };
};

export const useGallery = () => {
  const [{ data, isLoading }, fetchGallery] = useGetRequest({
    url: `${endpoints.backend}/gallery`,
    params: {
      size: 4,
      page: 0
    }
  });
  useEffect(() => void fetchGallery(), [fetchGallery]);
  return { photos: data?.photos ?? [], isLoading };
};
