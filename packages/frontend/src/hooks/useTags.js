import { useEffect } from "react";
import get from "lodash/get";

import { endpoints } from "../constants";
import useRequest from "../hooks/useRequest";

export default () => {
  const [{ data, isLoading }, getTags] = useRequest(() => ({
    method: "GET",
    url: `${endpoints.backend}/gallery/tags`
  }));

  const [, handleDelete] = useRequest(
    data => ({
      method: "DELETE",
      url: `${endpoints.backend}/gallery/tags`,
      data
    }),
    () => window.location.reload()
  );

  useEffect(() => void getTags(), []);
  return [get(data, "tags") || [], handleDelete, isLoading];
};
