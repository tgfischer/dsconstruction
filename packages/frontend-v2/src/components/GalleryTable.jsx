import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Alert } from "react-bootstrap";

import { GalleryPreview } from "components/GalleryPreview";

export const GalleryTable = ({ photos }) => (
  <Row>
    {photos.length === 0 && (
      <Col xs={12}>
        <Alert variant="info">
          There doesn't appear to be any photos in this category
        </Alert>
      </Col>
    )}
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
