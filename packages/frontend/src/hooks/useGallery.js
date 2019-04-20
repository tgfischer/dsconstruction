import { useEffect, useContext } from "react";
import get from "lodash/get";
import qs from "qs";

import { GalleryContext } from "../contexts/GalleryProvider";
import { endpoints } from "../constants";
import useRequest from "../hooks/useRequest";
import useUser from "../hooks/useUser";

export const useFetchGallery = () => {
  const [state, setState] = useContext(GalleryContext);
  const [
    { data: photosData, isLoading: isPhotosLoading },
    handleGetPage
  ] = useRequest(data => ({
    method: "GET",
    url: `${endpoints.backend}/gallery`,
    params: {
      page: data.page,
      tags: data.tags,
      size: data.size
    },
    paramsSerializer: qs.stringify
  }));
  const [
    { data: tagsData, isLoading: isTagsLoading },
    handleGetTags
  ] = useRequest(() => ({
    method: "GET",
    url: `${endpoints.backend}/gallery/tags`
  }));

  useEffect(() => {
    const photos = get(photosData, ["gallery", "photos"]);
    if (photos) {
      setState({
        ...state,
        photos: photos.map(photo => ({ ...photo, isSelected: false })),
        count: get(photosData, ["gallery", "count"]) || 0
      });
    }
  }, [photosData]);

  useEffect(() => {
    const tags = get(tagsData, "tags") || [];
    if (tags) {
      setState({ ...state, tags });
    }
  }, [tagsData]);

  useEffect(() => {
    const isLoading = isPhotosLoading || isTagsLoading;
    if (isLoading !== state.isLoading) {
      setState({ ...state, isLoading });
    }
  }, [isPhotosLoading, isTagsLoading]);

  useEffect(() => {
    const { page, size, selectedTags } = state;
    setState({ ...state, handleGetPage });
    handleGetPage({ page, size, tags: selectedTags });
    handleGetTags();
  }, []);

  return [photosData, handleGetPage, isPhotosLoading || isTagsLoading];
};

export default () => {
  const [state, setState] = useContext(GalleryContext);
  const { idToken } = useUser();
  const [{ isLoading: isDeleting }, handleDeleteTag] = useRequest(
    data => ({
      method: "DELETE",
      url: `${endpoints.backend}/gallery/tags`,
      data,
      headers: {
        Authorization: idToken
      }
    }),
    () => window.location.reload()
  );

  return {
    ...state,
    handleSelectPhoto: id => {
      const photos = state.photos.map(photo =>
        photo.id === id
          ? {
              ...photo,
              isSelected: !photo.isSelected
            }
          : photo
      );
      setState({ ...state, photos });
    },
    handleSelectTag: e => {
      setState({ ...state, selectedTags: e.target.value });
      state.handleGetPage({ ...state, tags: e.target.value });
    },
    handleGetPage: (_, page) => {
      setState({ ...state, photos: [], page });
      state.handleGetPage({ ...state, page, tags: state.selectedTags });
    },
    handleDeleteTag,
    isLoading: state.isLoading || isDeleting
  };
};
