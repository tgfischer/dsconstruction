import React from "react";

import Preview from "./Preview";
import GalleryCards from "./GalleryCards";
import ButtonLink from "./ButtonLink";
import useGallery from "../hooks/useGallery";
import GalleryProvider from "../contexts/GalleryProvider";

const GalleryPreview = () => {
  const { photos, isLoading } = useGallery();
  return (
    <Preview
      title="Photo Gallery"
      isLoading={isLoading}
      Action={() => <ButtonLink to="/gallery">View More</ButtonLink>}
    >
      <GalleryCards photos={photos} />
    </Preview>
  );
};

const GalleryPreviewWrapper = () => (
  <GalleryProvider initialState={{ page: 0, size: 4 }}>
    <GalleryPreview />
  </GalleryProvider>
);

export default GalleryPreviewWrapper;
