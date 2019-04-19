import React from "react";
import PropTypes from "prop-types";

import { useGalleryModal } from "./hooks";
import GalleryDropzone from "./GalleryDropzone";
import Modal from "../Modal";

const AddPhotosModal = ({ title, isOpen, onClose }) => {
  const [onSubmit, isLoading] = useGalleryModal(onClose);
  return (
    <Modal
      title={title}
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={onSubmit}
      maxWidth="sm"
    >
      <GalleryDropzone isLoading={isLoading} />
    </Modal>
  );
};

AddPhotosModal.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default AddPhotosModal;
