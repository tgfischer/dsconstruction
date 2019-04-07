import React from "react";

import Preview from "./Preview";
import Gallery from "./Gallery";
import ButtonLink from "./ButtonLink";
import useGallery from "../hooks/useGallery";

const GalleryPreview = () => {
  const [photos, , isLoading] = useGallery({ size: 4 });
  return (
    <Preview
      title="Photo Gallery"
      isLoading={isLoading}
      Action={() => <ButtonLink to="/gallery">View More</ButtonLink>}
    >
      <Gallery photos={photos} />
    </Preview>
  );
};

export default GalleryPreview;
