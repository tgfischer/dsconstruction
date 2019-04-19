import React from "react";
import PropTypes from "prop-types";

import Preview from "./Preview";
import GalleryCards from "./GalleryCards";
import ButtonLink from "./ButtonLink";
import GalleryProvider from "../contexts/GalleryProvider";

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

const GalleryPreviewWrapper = props => (
  <GalleryProvider initialState={{ page: 0, size: 4 }}>
    <GalleryPreview {...props} />
  </GalleryProvider>
);

export default GalleryPreviewWrapper;
