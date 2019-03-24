import React from "react";
import Typography from "@material-ui/core/Typography";

import Container from "../Container";
import useGallery from "../../hooks/useGallery";
import LoadingSpinner from "../LoadingSpinner";
import GalleryImages from "./GalleryImages";

const GalleryPreview = () => {
  const [images, isLoading] = useGallery({ size: 4 });
  return (
    <Container spaced>
      <Typography variant="h3" gutterBottom>
        Photos
      </Typography>
      {isLoading && <LoadingSpinner />}
      {!isLoading && <GalleryImages images={images} />}
    </Container>
  );
};

export default GalleryPreview;
