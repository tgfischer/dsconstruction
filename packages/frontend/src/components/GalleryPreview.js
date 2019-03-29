import React from "react";
import Grid from "@material-ui/core/Grid";

import Preview from "./Preview";
import ButtonLink from "./ButtonLink";
import GalleryCard from "./GalleryCard";
import useGallery from "../hooks/useGallery";

const GalleryPreview = () => {
  const [images, isLoading] = useGallery({ size: 4 });
  return (
    <Preview
      title="Photo Gallery"
      isLoading={isLoading}
      Action={() => <ButtonLink to="/gallery">View More</ButtonLink>}
    >
      <Grid spacing={16} container>
        {images.map(({ thumbnail, original }, i) => (
          <Grid key={i} sm={3} xs={12} item>
            <GalleryCard thumbnail={thumbnail} original={original} />
          </Grid>
        ))}
      </Grid>
    </Preview>
  );
};

export default GalleryPreview;
