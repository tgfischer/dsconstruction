import React, { Fragment } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import AddIcon from "@material-ui/icons/Add";
import LabelIcon from "@material-ui/icons/Label";
import DeleteIcon from "@material-ui/icons/Delete";
import EditAttributesIcon from "@material-ui/icons/EditAttributes";
import { withStyles } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";

import Dashboard from "../Dashboard";
import Tags from "./Tags";
import Gallery from "../Gallery";
import { useDashboardGallery } from "./hooks";

const styles = theme => ({
  button: {
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  deleteButton: {
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700]
    }
  },
  buttonIcon: {
    marginRight: theme.spacing.unit
  },
  spinner: {
    marginLeft: theme.spacing.unit
  },
  tag: {
    margin: 5
  }
});

const DashboardGallery = ({ classes }) => {
  const [
    photos,
    showPhotoModal,
    tags,
    showTagModal,
    showEditModal,
    deletePhotos,
    deleteTag,
    selectPhoto,
    isLoading
  ] = useDashboardGallery();
  return (
    <Dashboard>
      <Grid spacing={24} container>
        <Grid xs={12} item>
          <Button
            className={classes.button}
            onClick={showPhotoModal}
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
                  deletePhotos(photos.filter(({ isSelected }) => isSelected))
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
          <Tags tags={tags} onDelete={deleteTag} />
        </Grid>
        <Grid xs={12} item>
          <Gallery
            photos={photos}
            onClick={({ id }) => selectPhoto(id)}
            footer={({ photo }) => {
              return photo.tags.map(name => (
                <Chip
                  key={name}
                  className={classes.tag}
                  label={name}
                  variant="outlined"
                />
              ));
            }}
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

export default withStyles(styles)(DashboardGallery);
