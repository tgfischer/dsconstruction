import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import qs from "qs";

import { useGetRequest } from "hooks/useRequest";
import { useQuery } from "hooks/useQuery";
import { endpoints } from "constants/api";

export const useGalleryPage = () => {
  const { page = 0, size, tag } = useQuery();
  const { push } = useHistory();
  const [
    { data: gallery, isLoaded: isGalleryLoaded },
    fetchGallery
  ] = useGetRequest({
    url: `${endpoints.backend}/gallery`
  });
  const [{ data: tags, isLoaded: isTagsLoaded }, fetchTags] = useGetRequest({
    url: `${endpoints.backend}/gallery/tags`
  });

  useEffect(() => void fetchTags(), [fetchTags]);
  useEffect(
    () =>
      void fetchGallery({
        params: { page: 0, tag }
      }),
    [tag, push, fetchGallery]
  );

  return {
    photos: gallery?.photos ?? [],
    tags: tags ?? [],
    selectedTag: tag,
    pagination: {
      currentPage: Number.parseInt(page ?? 0, 10),
      totalCount: Math.ceil(
        Number.parseInt(gallery?.count ?? 0, 10) /
          Number.parseInt(size ?? gallery?.count ?? 1, 10)
      ),
      onChange: nextPage => () =>
        push({
          pathname: "/gallery",
          search: qs.stringify({ page: nextPage, size })
        })
    },
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
    isLoaded: isGalleryLoaded && isTagsLoaded,
    fetchGallery
  };
};
