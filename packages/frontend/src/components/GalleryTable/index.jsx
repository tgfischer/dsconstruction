import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Alert, Card } from "react-bootstrap";
import Lightbox from "react-image-lightbox";

import { useGalleryTable } from "./hooks";

import "react-image-lightbox/style.css";

export const GalleryTable = props => {
  const {
    isOpen,
    currentIndex,
    photos,
    paginatedPhotos,
    getGalleryPreviewProps,
    handleMovePrev,
    handleMoveNext,
    handleClose
  } = useGalleryTable(props);
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
      {isOpen && (
        <Lightbox
          mainSrc={photos[currentIndex].original}
          nextSrc={photos[(currentIndex + 1) % photos.length].original}
          prevSrc={
            photos[(currentIndex + photos.length - 1) % photos.length].original
          }
          onCloseRequest={handleClose}
          onMovePrevRequest={handleMovePrev}
          onMoveNextRequest={handleMoveNext}
        />
      )}
    </>
  );
};

GalleryTable.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  currentPage: PropTypes.number
};

GalleryTable.defaultProps = {
  currentPage: 0
};
