import React from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";
import filesize from "filesize";

import { Spinner } from "components/Spinner";
import { useUploadPhotosForm } from "./hooks";

export const UploadPhotosForm = props => {
  const {
    photos,
    getRootProps,
    getInputProps,
    isSubmitting,
    onClose,
    onSubmit
  } = useUploadPhotosForm(props);
  return (
    <>
      <Card>
        <Card.Body
          {...getRootProps({ className: "d-flex flex-row cursor-pointer" })}
        >
          <div className="d-flex align-items-center justify-content-center ml-1 mr-4">
            <FontAwesomeIcon className="h4 mb-0" icon={faUpload} />
          </div>
          <div>
            <input {...getInputProps()} />
            Drag and drop your photos here, or click to select some from your
            device
          </div>
        </Card.Body>
        <Card.Footer>
          <FontAwesomeIcon className="mr-2" icon={faExclamationTriangle} />
          Note: There is a 6MB file size limit
        </Card.Footer>
      </Card>
      <div className="mt-3 d-flex justify-content-end">
        {isSubmitting && (
          <Spinner className="ml-3 align-items-center" size="sm" />
        )}
        <Button
          variant="outline"
          onClick={onClose}
          disabled={photos.length === 0}
        >
          Cancel
        </Button>
        <Button onClick={onSubmit} disabled={photos.length === 0}>
          Upload photos
        </Button>
      </div>
      {photos.length > 0 && (
        <Card className="mt-3">
          <Card.Header className="border-bottom-0">
            <span className="h6">Photos to upload</span>
          </Card.Header>
          <ListGroup variant="flush">
            {photos.map(({ path, size, lastModified }) => (
              <ListGroup.Item
                key={path + lastModified}
                className="d-flex justify-content-between"
              >
                <span>{path}</span>
                <span>{filesize(size)}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      )}
    </>
  );
};
