import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import RootRef from "@material-ui/core/RootRef";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import DeleteIcon from "@material-ui/icons/Delete";
import filter from "lodash/filter";
import { withStyles } from "@material-ui/core/styles";

import { usePaperDropzone } from "./hooks";
import LoadingSpinner from "../LoadingSpinner";

const styles = theme => ({
  button: {
    marginBottom: theme.spacing.unit * 2
  },
  buttonIcon: {
    marginRight: theme.spacing.unit
  }
});

const PaperDropzone = ({ multiple, files, setFiles, isLoading, classes }) => {
  const [{ ref, rootProps, getInputProps }] = usePaperDropzone(setFiles, {
    multiple
  });
  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <Fragment>
      <RootRef rootRef={ref}>
        <Fragment>
          <input {...getInputProps()} />
          <Button
            {...rootProps}
            className={classes.button}
            variant="contained"
            color="primary"
            size="large"
            fullWidth
          >
            <CloudUploadIcon className={classes.buttonIcon} />
            Select photos
          </Button>
        </Fragment>
      </RootRef>
      {files.length > 0 && (
        <Fragment>
          <Typography variant="h6">Photos</Typography>
          <List dense>
            {files.map(({ name, path, type }) => (
              <ListItem key={path}>
                <ListItemText primary={name} secondary={type} />
                <ListItemSecondaryAction>
                  <IconButton
                    aria-label="Delete"
                    onClick={() =>
                      setFiles(filter(files, file => file.path !== path))
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Fragment>
      )}
    </Fragment>
  );
};

PaperDropzone.propTypes = {
  multiple: PropTypes.bool,
  files: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  setFiles: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  classes: PropTypes.shape({
    button: PropTypes.string.isRequired,
    buttonIcon: PropTypes.string.isRequired
  }).isRequired
};

PaperDropzone.defaultProps = {
  multiple: false
};

export default withStyles(styles)(PaperDropzone);
