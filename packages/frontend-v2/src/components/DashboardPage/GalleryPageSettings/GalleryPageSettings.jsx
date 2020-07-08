import React from "react";
import { Row, Col, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faTag,
  faToggleOn,
  faTimes
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
