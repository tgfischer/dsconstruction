import React, { Fragment } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import AddIcon from "@material-ui/icons/Add";
import LabelIcon from "@material-ui/icons/Label";
import DeleteIcon from "@material-ui/icons/Delete";
import EditAttributesIcon from "@material-ui/icons/EditAttributes";
import { withStyles } from "@material-ui/core/styles";
import Dashboard from "../Dashboard";
import { red } from "@material-ui/core/colors";
import { Grid, Button, Chip } from "@material-ui/core";

import Tags from "./Tags";
import GalleryTable from "../GalleryTable";
import { useDashboardGallery } from "./hooks";
import GalleryProvider from "../../contexts/GalleryProvider";

const styles = theme => ({
  button: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  deleteButton: {
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700]
    }
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  },
  spinner: {
    marginLeft: theme.spacing(1)
  },
  tag: {
    margin: 5
  }
});

const DashboardGallery = ({ classes }) => {
  const {
    photos,
    showPhotosModal,
    tags,
    showTagModal,
    showEditModal,
    handleDeletePhotos,
    handleDeleteTag,
    handleSelectPhoto,
    isLoading
  } = useDashboardGallery({ fetch: false });
  return (
    <Dashboard title="Gallery settings" isLoading={isLoading}>
      <Grid spacing={3} container>
        <Grid xs={12} item>
          <Button
            className={classes.button}
            onClick={showPhotosModal}
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            <AddIcon className={classes.buttonIcon} />
            Add Photos
          </Button>
          <Button
            className={classes.button}
            onClick={showTagModal}
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            <LabelIcon className={classes.buttonIcon} />
            Add Category
          </Button>
          {photos.some(({ isSelected }) => isSelected) && (
            <Fragment>
              <Button
                className={classes.button}
                onClick={showEditModal}
                variant="contained"
                color="primary"
                disabled={isLoading}
              >
                <EditAttributesIcon className={classes.buttonIcon} />
                Toggle categories
              </Button>
              <Button
                className={classnames(classes.button, classes.deleteButton)}
                onClick={() =>
                  handleDeletePhotos(
                    photos.filter(({ isSelected }) => isSelected)
                  )
                }
                variant="contained"
                color="primary"
                disabled={isLoading}
              >
                <DeleteIcon className={classes.buttonIcon} />
                Delete Photos
              </Button>
            </Fragment>
          )}
        </Grid>
        <Grid xs={12} item>
          <Tags tags={tags} onDelete={handleDeleteTag} />
        </Grid>
        <Grid xs={12} item>
          <GalleryTable
            onClick={({ id }) => handleSelectPhoto(id)}
            footer={({ photo }) =>
              photo.tags.map(name => (
                <Chip
                  key={name}
                  className={classes.tag}
                  label={name}
                  variant="outlined"
                />
              ))
            }
          />
        </Grid>
      </Grid>
    </Dashboard>
  );
};

DashboardGallery.propTypes = {
  classes: PropTypes.shape({
    buttonIcon: PropTypes.string.isRequired
  }).isRequired
};

const GalleryPreviewWrapper = props => (
  <GalleryProvider initialState={{ page: 0, size: 12 }}>
    <DashboardGallery {...props} />
  </GalleryProvider>
);

export default withStyles(styles)(GalleryPreviewWrapper);
