import { useState, useMemo } from "react";
import { isNil, take, drop } from "lodash";
import { useQuery } from "hooks/useQuery";

export const useGalleryTable = ({ photos, currentPage }) => {
  const query = useQuery();
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

  const page = query.page ? Number.parseInt(query.page, 10) : 0;
  const size = query.size ? Number.parseInt(query.size, 10) : null;

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
        setState({
          url: regular,
          currentIndex: (size ?? views.length) * page + i
        })
    }),
    handleCloseModal: () => setState({})
  };
};
