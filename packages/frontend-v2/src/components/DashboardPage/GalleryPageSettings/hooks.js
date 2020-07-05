import { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { isNil, take, drop, filter } from "lodash";
import qs from "qs";

import { useGalleryPage } from "components/GalleryPage";
import { useQuery } from "hooks/useQuery";

export const useGalleryPageSettings = () => {
  const { photos, pagination, ...gallery } = useGalleryPage();
  const { page = 0, size } = useQuery();
  const { push } = useHistory();
  return {
    ...gallery,
    photos: useMemo(
      () => (isNil(size) ? photos : take(drop(photos, page * size), size)),
      [page, photos, size]
    ),
    pagination: {
      ...pagination,
      onChange: nextPage => () =>
        push({
          pathname: "/dashboard/gallery",
          search: qs.stringify({ page: nextPage, size })
        })
    },
    onChangeTag: e =>
      e.target.value === "-1"
        ? push({
            pathname: "/dashboard/gallery",
            search: qs.stringify({ page: 0, size })
          })
        : push({
            pathname: "/dashboard/gallery",
            search: qs.stringify({ page: 0, size, tag: e.target.value })
          })
  };
};

export const useGalleryTable = () => {
  const [{ selectedPhotos }, setState] = useState({ selectedPhotos: [] });
  return {
    selectedPhotos,
    onClick: id => () =>
      setState(state => ({
        selectedPhotos: selectedPhotos.includes(id)
          ? filter(selectedPhotos, o => o !== id)
          : [...state.selectedPhotos, id]
      })),
    getPreviewProps: ({ thumbnail }) => ({
      className: "ds-gallery-preview pt-2 pl-2",
      style: {
        background: `url(${thumbnail}) no-repeat center center / cover`
      }
    })
  };
};
