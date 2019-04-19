import { useEffect, useContext } from "react";
import get from "lodash/get";

import { endpoints } from "../constants";
import useRequest from "./useRequest";
import useUser from "./useUser";
import { GalleryContext } from "../contexts/GalleryProvider";

export default () => {
  const [state, setState] = useContext(GalleryContext);
  const { idToken } = useUser();
  const [{ data, isLoading }, getTags] = useRequest(() => ({
    method: "GET",
    url: `${endpoints.backend}/gallery/tags`
  }));

  const [{ isLoading: isDeleting }, handleDelete] = useRequest(data => ({
    method: "DELETE",
    url: `${endpoints.backend}/gallery/tags`,
    data,
    headers: {
      Authorization: idToken
    }
  }));

  useEffect(() => void getTags(), []);

  useEffect(() => {
    const tags = get(data, "tags") || [];
    if (tags) {
      setState({
        ...state,
        tags
      });
    }
  }, [data]);

  return [state.tags, handleDelete, isLoading || isDeleting];
};
