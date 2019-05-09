import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import { useAddPhoneNumberModal } from "./hooks";
import Modal from "../Modal";

const AddPhoneNumberModal = ({
  title,
  phoneNumbers,
  isOpen,
  onSubmit,
  onClose
}) => {
  const [handleSubmit, input] = useAddPhoneNumberModal(phoneNumbers, onSubmit);
  return (
    <Modal
      title={title}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      maxWidth="sm"
      fullWidth
    >
      <Grid spacing={16} container>
        <Grid xs={12} item>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            required
            {...input.text("name")}
          />
        </Grid>
        <Grid xs={12} item>
          <TextField
            label="Phone number"
            variant="outlined"
            fullWidth
            required
            {...input.number("number")}
          />
        </Grid>
      </Grid>
    </Modal>
  );
};

AddPhoneNumberModal.propTypes = {
  title: PropTypes.string.isRequired,
  phoneNumbers: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default AddPhoneNumberModal;
