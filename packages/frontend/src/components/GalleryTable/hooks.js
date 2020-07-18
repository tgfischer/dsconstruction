import { useMemo } from "react";
import { isNil, take, drop } from "lodash";
import { useLightbox } from "simple-react-lightbox";

import { useQuery } from "hooks/useQuery";

export const useGalleryTable = ({ photos }) => {
  const { openLightbox } = useLightbox();
  const query = useQuery();

  const page = query.page ? Number.parseInt(query.page, 10) : 0;
  const size = query.size ? Number.parseInt(query.size, 10) : null;

  const views = useMemo(
    () =>
      photos.map(({ thumbnail, original }) => ({
        src: original,
        thumbnail,
        height: "auto"
      })),
    [photos]
  );

  return {
    photos: views,
    paginatedPhotos: useMemo(
      () => (isNil(size) ? photos : take(drop(photos, page * size), size)),
      [page, size, photos]
    ),
    getGalleryPreviewProps: ({ thumbnail }, i) => ({
      className: "ds-gallery-preview shadow",
      style: {
        background: `url(${thumbnail}) no-repeat center center / cover`
      },
      onClick: () => openLightbox((size ?? photos.length) * page + i)
    })
  };
};
