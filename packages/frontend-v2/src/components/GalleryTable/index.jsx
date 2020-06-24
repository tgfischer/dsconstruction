import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Alert, Card } from "react-bootstrap";
import Carousel, { Modal, ModalGateway } from "react-images";

import { useGalleryTable } from "./hooks";
import { View } from "./View";

export const GalleryTable = props => {
  const {
    url,
    currentIndex,
    views,
    paginatedViews,
    getGalleryPreviewProps,
    handleCloseModal
  } = useGalleryTable(props);
  return (
    <>
      <Row>
        {paginatedViews.length === 0 && (
          <Col xs={12}>
            <Alert variant="info">
              There doesn't appear to be any photos in this category
            </Alert>
          </Col>
        )}
        {paginatedViews.map(({ id, source }, i) => (
          <Col key={id} className="mb-4" lg={3} md={4} sm={6} xs={12}>
            <Card {...getGalleryPreviewProps(source, i)} />
          </Col>
        ))}
      </Row>
      <ModalGateway>
        {url && (
          <Modal onClose={handleCloseModal}>
            <Carousel
              views={views}
              currentIndex={currentIndex}
              components={{ View }}
            />
          </Modal>
        )}
      </ModalGateway>
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
