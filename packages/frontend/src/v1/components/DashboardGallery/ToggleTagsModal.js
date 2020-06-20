import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch
} from "@material-ui/core";

import Modal from "../Modal";
import { useToggleTagsModal } from "./hooks";

const ToggleTagsModal = ({ title, isOpen, photos, tags, onClose }) => {
  const [addCheckbox, removeCheckbox, onSubmit] = useToggleTagsModal(photos);
  return (
    <Modal
      title={title}
      isOpen={isOpen}
      isLoading={false}
      onClose={onClose}
      onSubmit={onSubmit}
      maxWidth="sm"
    >
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Remove</Typography>
          <FormGroup>
            {tags.map(({ id, name }) => (
              <FormControlLabel
                key={id}
                control={<Switch {...removeCheckbox(name)} color="primary" />}
                label={name}
              />
            ))}
          </FormGroup>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Add</Typography>
          <FormGroup>
            {tags.map(({ id, name }) => (
              <FormControlLabel
                key={id}
                control={<Switch {...addCheckbox(name)} color="primary" />}
                label={name}
              />
            ))}
          </FormGroup>
        </Grid>
      </Grid>
    </Modal>
  );
};

ToggleTagsModal.propTypes = {
  title: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      original: PropTypes.string.isRequired
    })
  ).isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ToggleTagsModal;
