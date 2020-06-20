import React from "react";
import PropTypes from "prop-types";
import { CircularProgress, Grid, Typography } from "@material-ui/core";

import { useGalleryModal } from "./hooks";
import GalleryDropzone from "./GalleryDropzone";
import Modal from "../Modal";

const AddPhotosModal = ({ title, isOpen, onClose }) => {
  const [onSubmit, isLoading, progress, totalPhotos] = useGalleryModal(onClose);
  return (
    <Modal
      title={title}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      maxWidth="sm"
    >
      {totalPhotos > 0 && isLoading && (
        <Grid container spacing={2} justify="center" alignItems="center">
          <CircularProgress
            variant="static"
            size={100}
            color="secondary"
            value={(progress / totalPhotos) * 100}
          />
          <Grid xs={12} item>
            <Typography align="center">
              Uploaded {progress} of {totalPhotos}
            </Typography>
          </Grid>
        </Grid>
      )}
      {!isLoading && <GalleryDropzone />}
    </Modal>
  );
};

AddPhotosModal.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default AddPhotosModal;
