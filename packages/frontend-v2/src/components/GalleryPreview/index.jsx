import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

import { useGalleryPreview } from "./hooks";

export const GalleryPreview = props => {
  const { getGalleryPreviewProps } = useGalleryPreview(props);
  return <Card {...getGalleryPreviewProps()} />;
};

GalleryPreview.propTypes = {
  thumbnail: PropTypes.string.isRequired
};
