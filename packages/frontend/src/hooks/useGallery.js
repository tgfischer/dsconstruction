import { useEffect, useContext } from "react";
import get from "lodash/get";
import qs from "qs";

import { GalleryContext } from "../contexts/GalleryProvider";
import { endpoints } from "../constants";
import useRequest from "../hooks/useRequest";
import useTags from "../hooks/useTags";

export const useFetchGallery = () => {
  const [state, setState] = useContext(GalleryContext);
  const [{ data, isLoading }, handleGetPage] = useRequest(data => ({
    method: "GET",
    url: `${endpoints.backend}/gallery`,
    params: {
      page: data.page,
      tags: data.tags,
      size: data.size
    },
    paramsSerializer: qs.stringify
  }));

  useEffect(() => {
    const { page, size, selectedTags } = state;
    setState({ ...state, handleGetPage });
    handleGetPage({ page, size, tags: selectedTags });
  }, []);

  useEffect(() => {
    const photos = get(data, ["gallery", "photos"]);
    if (photos) {
      setState({
        ...state,
        photos: photos.map(photo => ({
          ...photo,
          isSelected: false
        })),
        count: get(data, ["gallery", "count"]) || 0
      });
    }
  }, [data]);

  return [data, handleGetPage, isLoading];
};

export default () => {
  const [state, setState] = useContext(GalleryContext);
  const [, handleDeleteTag, isLoadingTags] = useTags();

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
      setState({
        ...state,
        selectedTags: e.target.value
      });
      state.handleGetPage({
        ...state,
        tags: e.target.value
      });
    },
    handleGetPage: (_, page) => {
      setState({
        ...state,
        photos: [],
        page
      });
      state.handleGetPage({ ...state, page, tags: state.selectedTags });
    },
    handleDeleteTag,
    isLoading: state.isLoading || isLoadingTags
  };
};
