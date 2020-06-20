import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";

import { useAddTagModal } from "./hooks";
import Modal from "../Modal";

const AddTagModal = ({ title, isOpen, onClose }) => {
  const [onSubmit, input, isLoading] = useAddTagModal(onClose);
  return (
    <Modal
      title={title}
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={onSubmit}
      maxWidth="sm"
      fullWidth
    >
      <TextField
        label="Category name"
        variant="outlined"
        disabled={isLoading}
        fullWidth
        required
        {...input.text("name")}
      />
    </Modal>
  );
};

AddTagModal.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default AddTagModal;
