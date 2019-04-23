import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import { useUserModal } from "./hooks";
import Modal from "../Modal";

const DashboardUsersModal = ({ title, isOpen, onClose }) => {
  const [onSubmit, input, isLoading] = useUserModal(onClose);
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
      <Grid spacing={16} container>
        <Grid xs={12} item>
          <TextField
            label="First name"
            variant="outlined"
            disabled={isLoading}
            fullWidth
            required
            {...input.text("firstName")}
          />
        </Grid>
        <Grid xs={12} item>
          <TextField
            label="Last name"
            variant="outlined"
            disabled={isLoading}
            fullWidth
            required
            {...input.text("lastName")}
          />
        </Grid>
        <Grid xs={12} item>
          <TextField
            label="Email"
            variant="outlined"
            disabled={isLoading}
            fullWidth
            required
            {...input.email("email")}
          />
        </Grid>
      </Grid>
    </Modal>
  );
};

DashboardUsersModal.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default DashboardUsersModal;
