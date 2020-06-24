import { useState, useMemo } from "react";
import { isNil, take, drop } from "lodash";
import { useQuery } from "hooks/useQuery";

export const useGalleryTable = ({ photos, currentPage }) => {
  const { page = 0, size } = useQuery();
  const [state, setState] = useState({});
  const views = useMemo(
    () =>
      photos.map(({ id, original, thumbnail }) => ({
        id,
        source: {
          thumbnail,
          regular: original,
          fullscreen: original
        }
      })),
    [photos]
  );

  return {
    ...state,
    views,
    paginatedViews: useMemo(
      () => (isNil(size) ? views : take(drop(views, page * size), size)),
      [page, size, views]
    ),
    getGalleryPreviewProps: ({ thumbnail, regular }, i) => ({
      className: "ds-gallery-preview shadow",
      style: {
        background: `url(${thumbnail}) no-repeat center center / cover`
      },
      onClick: () =>
        setState({ url: regular, currentIndex: i * (currentPage + 1) })
    }),
    handleCloseModal: () => setState({})
  };
};
