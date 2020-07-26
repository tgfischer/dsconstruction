import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Alert, Card, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSquare } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";

import { TagsDropdown } from "components/TagsDropdown";
import { Pagination } from "components/Pagination";
import { useGalleryTable } from "./hooks";

export const GalleryTable = ({
  photos,
  tags,
  selectedTag,
  pagination,
  onChangeTag,
  ...props
}) => {
  const { selectedPhotos, onClick, getPreviewProps } = useGalleryTable(props);
  return (
    <Row>
      {tags.length > 0 && (
        <>
          <Col sm={4} xs={12}>
            <TagsDropdown
              value={selectedTag}
              tags={tags}
              onChange={onChangeTag}
            />
          </Col>
          <Col className="d-flex justify-content-end" sm={8} xs={12}>
            {pagination.totalCount > 0 && <Pagination {...pagination} />}
          </Col>
        </>
      )}
      {photos.length === 0 && (
        <Col xs={12}>
          <Alert variant="info">
            There doesn't appear to be any photos in this category
          </Alert>
        </Col>
      )}
      {photos.map(({ id, tags, ...photo }) => (
        <Col key={id} className="mb-4" md={4} sm={6} xs={12}>
          <Card onClick={onClick(id)} className="shadow">
            <Card.Body {...getPreviewProps(photo)}>
              <span
                className={classnames("fa-layers fa-fw", {
                  invisible: !selectedPhotos.includes(id)
                })}
              >
                <FontAwesomeIcon icon={faSquare} className="text-primary" />
                <FontAwesomeIcon icon={faCheck} inverse transform="shrink-6" />
              </span>
            </Card.Body>
            {tags.length > 0 && (
              <Card.Footer className="p-2">
                {tags.map(name => (
                  <Badge key={name} className="mr-1" variant="secondary">
                    {name}
                  </Badge>
                ))}
              </Card.Footer>
            )}
          </Card>
        </Col>
      ))}
    </Row>
  );
};

GalleryTable.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  tags: PropTypes.array.isRequired,
  selectedTag: PropTypes.string,
  pagination: PropTypes.shape({
    totalCount: PropTypes.number.isRequired
  }).isRequired,
  onChangeTag: PropTypes.func.isRequired
};

GalleryTable.defaultProps = {
  currentPage: 0
};
