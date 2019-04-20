import React from "react";
import PropTypes from "prop-types";

import Preview from "./Preview";
import GalleryCards from "./GalleryCards";
import ButtonLink from "./ButtonLink";

const GalleryPreview = ({ photos }) => (
  <Preview
    title="Photo Gallery"
    Action={() => <ButtonLink to="/gallery">View More</ButtonLink>}
  >
    <GalleryCards photos={photos} />
  </Preview>
);

GalleryPreview.propTypes = {
  photos: PropTypes.array
};

GalleryPreview.defaultProps = {
  photos: []
};

export default GalleryPreview;
