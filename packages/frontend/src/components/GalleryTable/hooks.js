import { useState, useMemo } from "react";
import { isNil, take, drop } from "lodash";
import { useQuery } from "hooks/useQuery";

export const useGalleryTable = ({ photos, currentPage }) => {
  const query = useQuery();
  const [state, setState] = useState({ isOpen: false });

  const page = query.page ? Number.parseInt(query.page, 10) : 0;
  const size = query.size ? Number.parseInt(query.size, 10) : null;

  return {
    ...state,
    photos,
    paginatedPhotos: useMemo(
      () => (isNil(size) ? photos : take(drop(photos, page * size), size)),
      [page, size, photos]
    ),
    getGalleryPreviewProps: ({ thumbnail, original }, i) => ({
      className: "ds-gallery-preview shadow",
      style: {
        background: `url(${thumbnail}) no-repeat center center / cover`
      },
      onClick: () => {
        const index = (size ?? photos.length) * page + i;
        return setState({
          isOpen: true,
          currentIndex: index
        });
      }
    }),
    handleMovePrev: () =>
      setState(state => ({
        ...state,
        currentIndex: (state.currentIndex + photos.length - 1) % photos.length
      })),
    handleMoveNext: () =>
      setState(state => ({
        ...state,
        currentIndex: (state.currentIndex + 1) % photos.length
      })),
    handleClose: () => setState({ isOpen: false })
  };
};
