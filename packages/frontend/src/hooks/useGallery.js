import { useEffect } from "react";
import get from "lodash/get";

import { endpoints } from "../constants";
import useRequest from "../hooks/useRequest";

export default (options = {}) => {
  const [{ data, isLoading }, getGallery] = useRequest(() => ({
    method: "GET",
    url: `${endpoints.backend}/gallery`,
    params: {
      size: options.size
    }
  }));

  useEffect(() => void getGallery(), []);
  return [get(data, "gallery") || [], isLoading];
};
