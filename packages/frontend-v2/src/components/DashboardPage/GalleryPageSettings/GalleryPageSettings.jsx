import React from "react";
import { Row, Col, Badge, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faTag,
  faToggleOn,
  faTimes,
  faInfo
} from "@fortawesome/free-solid-svg-icons";

import { Spinner } from "components/Spinner";
import { IconButton } from "components/IconButton";
import { GalleryTable } from "./GalleryTable";
import { useGalleryPageSettings } from "./hooks";

const GalleryPageSettings = () => {
  const {
    tags,
    isLoaded,
    selectedPhotos,
    addTag,
    deleteTag,
    toggleTags,
    ...gallery
  } = useGalleryPageSettings();
  return isLoaded ? (
    <Row>
      <Col className="mb-2" xs={12}>
        <IconButton className="mb-1 mr-1" icon={faPlus}>
          Add photos
        </IconButton>
        <IconButton className="mb-1 mr-1" icon={faTag} onClick={addTag}>
          Add Category
        </IconButton>
        <IconButton
          className="mb-1 mr-1"
          icon={faToggleOn}
          disabled={selectedPhotos.length === 0}
          onClick={toggleTags}
        >
          Toggle categories
        </IconButton>
        <IconButton
          className="mb-1"
          icon={faTrash}
          variant="danger"
          disabled={selectedPhotos.length === 0}
        >
          Delete photos
        </IconButton>
      </Col>
      <Col className="mb-2" xs={12}>
        <p className="h5">
          {tags.map(({ id, name }) => (
            <Badge
              key={id}
              onClick={deleteTag(id)}
              className="mr-1 cursor-pointer"
              variant="secondary"
            >
              {name}
              <FontAwesomeIcon className="ml-2" icon={faTimes} />
            </Badge>
          ))}
        </p>
      </Col>
      <Col xs={12}>
        <Alert variant="light">
          <Row>
            <div className="d-flex flex-row">
              <div className="d-flex align-items-center justify-content-center ml-4 mr-4">
                <FontAwesomeIcon className="h4 mb-0" icon={faInfo} />
              </div>
              <div>
                Select photos by clicking on the thumbnails. This will allow you
                to categorize or delete the selected photos using the actions
                above
              </div>
            </div>
          </Row>
        </Alert>
      </Col>
      <Col xs={12}>
        <GalleryTable
          {...gallery}
          tags={tags}
          selectedPhotos={selectedPhotos}
        />
      </Col>
    </Row>
  ) : (
    <Spinner isCentered />
  );
};

export default GalleryPageSettings;
