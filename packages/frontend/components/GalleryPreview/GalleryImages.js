import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

import GalleryImage from "../GalleryImage";

const GalleryPreview = ({ images }) => (
  <Grid spacing={16} container>
    {images.map(({ thumbnail, original }, i) => (
      <Grid key={i} sm={3} xs={12} item>
        <GalleryImage thumbnail={thumbnail} original={original} />
      </Grid>
    ))}
  </Grid>
);

GalleryPreview.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      thumbnail: PropTypes.string.isRequired,
      original: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default GalleryPreview;
