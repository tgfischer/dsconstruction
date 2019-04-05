import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

import { useServiceDialog } from "./hooks";
import Modal from "../Modal";

const AddDialog = ({ title, isOpen, onClose }) => {
  const [onSubmit, input, isLoading] = useServiceDialog(
    "/services/add",
    {},
    true,
    onClose
  );
  return (
    <Modal
      title={title}
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <TextField
        label="Service name"
        variant="outlined"
        disabled={isLoading}
        fullWidth
        required
        {...input.text("name")}
      />
    </Modal>
  );
};

AddDialog.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  submitButton: PropTypes.func.isRequired
};

export default AddDialog;
