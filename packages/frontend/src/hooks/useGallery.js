import { useEffect, useContext } from "react";
import get from "lodash/get";
import qs from "qs";

import { GalleryContext } from "../contexts/GalleryProvider";
import { endpoints } from "../constants";
import useRequest from "../hooks/useRequest";
import useTags from "../hooks/useTags";

export default () => {
  const [state, setState] = useContext(GalleryContext);
  const [, handleDeleteTag] = useTags();
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

  useEffect(() => void handleGetPage(state), []);

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
      handleGetPage({
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
      handleGetPage({ ...state, page, tags: state.selectedTags });
    },
    handleDeleteTag,
    isLoading
  };
};
