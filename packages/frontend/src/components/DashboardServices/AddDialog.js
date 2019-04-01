import React from "react";
import PropTypes from "prop-types";

import { useServiceDialog } from "./hooks";
import ServiceDialog from "./ServiceDialog";

const AddDialog = ({ title, isOpen, onClose }) => {
  const [onSubmit, values, input, isLoading] = useServiceDialog(
    "/services/add",
    {},
    onClose
  );
  return (
    <ServiceDialog
      title={title}
      values={values}
      input={input}
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
};

AddDialog.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  submitButton: PropTypes.func.isRequired
};

export default AddDialog;
