import { useEffect, useContext } from "react";
import get from "lodash/get";
import qs from "qs";

import { GalleryContext } from "../contexts/GalleryProvider";
import { endpoints } from "../../constants";
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
      tag: data.tag,
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
      setState(state => ({
        ...state,
        photos: photos.map(photo => ({ ...photo, isSelected: false })),
        count: get(photosData, ["gallery", "count"]) || 0
      }));
    }
  }, [photosData]);

  useEffect(() => {
    const tags = get(tagsData, "tags") || [];
    if (tags) {
      setState(state => ({ ...state, tags }));
    }
  }, [tagsData]);

  useEffect(() => {
    const isLoading = isPhotosLoading || isTagsLoading;
    if (isLoading !== state.isLoading) {
      setState(state => ({ ...state, isLoading }));
    }
  }, [isPhotosLoading, isTagsLoading]);

  useEffect(() => {
    const { page, size, selectedTag } = state;
    setState(state => ({ ...state, handleGetPage }));
    handleGetPage({ page, size, tag: selectedTag });
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
      setState(state => ({ ...state, photos }));
    },
    handleSelectTag: e => {
      const selectedTag =
        state.selectedTag === e.target.value ? undefined : e.target.value;
      setState(state => ({ ...state, selectedTag }));
      state.handleGetPage({ ...state, tag: selectedTag });
    },
    handleGetPage: (_, page) => {
      setState(state => ({ ...state, photos: [], page }));
      state.handleGetPage({ ...state, page, tag: state.selectedTag });
    },
    handleDeleteTag,
    isLoading: state.isLoading || isDeleting
  };
};
