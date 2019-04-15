import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

import { useServiceModal } from "./hooks";
import Modal from "../Modal";

const DashboardServicesModal = ({ title, isOpen, onClose }) => {
  const [onSubmit, input, isLoading] = useServiceModal(onClose);
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

DashboardServicesModal.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default DashboardServicesModal;
