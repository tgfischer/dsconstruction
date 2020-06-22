import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";

import { GalleryPreview } from "components/GalleryPreview";

export const GalleryTable = ({ photos }) => (
  <Row>
    {photos.map(({ id, ...photo }) => (
      <Col key={id} className="mb-4" lg={3} md={4} sm={6} xs={12}>
        <GalleryPreview {...photo} />
      </Col>
    ))}
  </Row>
);

GalleryTable.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};
