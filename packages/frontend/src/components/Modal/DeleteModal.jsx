import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

export const DeleteModal = ({ message, onDelete, onClose }) => (
  <>
    <p>{message}</p>
    <div className="d-flex justify-content-end">
      <Button variant="outline" onClick={onClose}>
        Cancel
      </Button>
      <Button variant="danger" onClick={() => (onClose(), onDelete())}>
        Delete
      </Button>
    </div>
  </>
);

DeleteModal.propTypes = {
  message: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};
