import React from "react";
import PropTypes from "prop-types";

import { useServiceDialog } from "./hooks";
import ServiceDialog from "./ServiceDialog";

const EditDialog = ({ title, service, isOpen, onClose }) => {
  const [onSubmit, values, input, isLoading] = useServiceDialog(
    "/services/edit",
    service,
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

EditDialog.propTypes = {
  title: PropTypes.string.isRequired,
  service: PropTypes.shape({
    name: PropTypes.string.isRequired,
    blurb: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  submitButton: PropTypes.func.isRequired
};

export default EditDialog;
