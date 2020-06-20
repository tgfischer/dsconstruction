import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

import GalleryCard from "./GalleryCard";

const GalleryTable = ({ photos, ...props }) => (
  <Grid spacing={2} container>
    {photos.map((photo, i) => (
      <Grid key={i} sm={3} xs={12} item>
        <GalleryCard photo={photo} {...props} />
      </Grid>
    ))}
  </Grid>
);

GalleryTable.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      original: PropTypes.string.isRequired
    })
  ).isRequired
};

export default GalleryTable;
