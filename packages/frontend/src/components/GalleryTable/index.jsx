import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Alert, Card } from "react-bootstrap";
import { SRLWrapper } from "simple-react-lightbox";

import { useGalleryTable } from "./hooks";
import { options } from "./constants";

export const GalleryTable = props => {
  const { photos, paginatedPhotos, getGalleryPreviewProps } = useGalleryTable(
    props
  );
  return (
    <>
      <Row>
        {paginatedPhotos.length === 0 && (
          <Col xs={12}>
            <Alert variant="info">
              There doesn't appear to be any photos in this category
            </Alert>
          </Col>
        )}
        {paginatedPhotos.map(({ id, ...photo }, i) => (
          <Col key={id} className="mb-4" lg={3} md={4} sm={6} xs={12}>
            <Card {...getGalleryPreviewProps(photo, i)} />
          </Col>
        ))}
      </Row>
      <SRLWrapper options={options} images={photos} />
    </>
  );
};

GalleryTable.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};
