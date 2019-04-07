import { useEffect, useState } from "react";
import get from "lodash/get";

import { endpoints } from "../constants";
import useRequest from "../hooks/useRequest";

export default (options = {}) => {
  const [state, setState] = useState({ photos: [] });
  const [{ data, isLoading }, getGallery] = useRequest(() => ({
    method: "GET",
    url: `${endpoints.backend}/gallery`,
    params: {
      size: options.size
    }
  }));

  useEffect(() => void getGallery(), []);
  useEffect(() => {
    const photos = get(data, "gallery");
    if (photos) {
      setState({
        photos: photos.map(photo => ({
          ...photo,
          isSelected: false
        }))
      });
    }
  }, [data]);

  return [
    state.photos,
    id => {
      const photos = state.photos.map(photo =>
        photo.id === id
          ? {
              ...photo,
              isSelected: !photo.isSelected
            }
          : photo
      );
      setState({ photos });
    },

    isLoading
  ];
};
