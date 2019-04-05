import React from "react";
import PropTypes from "prop-types";

import { useGalleryDialog } from "./hooks";
import GalleryDropzone from "./GalleryDropzone";
import Modal from "../Modal";

const AddDialog = ({ title, isOpen, onClose }) => {
  const [onSubmit, isLoading] = useGalleryDialog(onClose);
  return (
    <Modal
      title={title}
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={onSubmit}
      maxWidth="sm"
    >
      <GalleryDropzone />
    </Modal>
  );
};

AddDialog.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default AddDialog;
