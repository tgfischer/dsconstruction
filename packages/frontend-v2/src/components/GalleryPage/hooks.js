import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { isNil } from "lodash";
import qs from "qs";

import { useGetRequest } from "hooks/useRequest";
import { useQuery } from "hooks/useQuery";
import { endpoints } from "constants/api";

export const useGallery = () => {
  const { page, size, tag } = useQuery();
  const { push } = useHistory();
  const [
    { data: gallery, isLoading: isGalleryLoading },
    fetchGallery
  ] = useGetRequest({
    url: `${endpoints.backend}/gallery`
  });
  const [{ data: tags, isLoading: isTagsLoading }, fetchTags] = useGetRequest({
    url: `${endpoints.backend}/gallery/tags`
  });

  useEffect(() => void fetchTags(), [fetchTags]);
  useEffect(() => {
    if (isNil(page) || isNil(size)) {
      push("/gallery?page=0&size=12");
    } else {
      fetchGallery({
        params: { size, page, tag }
      });
    }
  }, [page, size, tag, push, fetchGallery]);

  return {
    photos: gallery?.photos ?? [],
    tags: tags ?? [],
    selectedTag: tag,
    handleChangeTag: e =>
      e.target.value === "-1"
        ? push({
            pathname: "/gallery",
            search: qs.stringify({ page: 0, size })
          })
        : push({
            pathname: "/gallery",
            search: qs.stringify({ page: 0, size, tag: e.target.value })
          }),
    isLoading: isGalleryLoading || isTagsLoading
  };
};
