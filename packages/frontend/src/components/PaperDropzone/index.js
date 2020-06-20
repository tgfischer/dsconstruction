import React, { Fragment } from "react";
import PropTypes from "prop-types";

import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import DeleteIcon from "@material-ui/icons/Delete";
import filter from "lodash/filter";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  Typography,
  RootRef
} from "@material-ui/core";

import { usePaperDropzone } from "./hooks";

const styles = theme => ({
  button: {
    marginBottom: theme.spacing(2)
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  }
});

const PaperDropzone = ({ multiple, files, setFiles, classes }) => {
  const [{ ref, rootProps, getInputProps }] = usePaperDropzone(setFiles, {
    multiple
  });
  return (
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
              <ListItem key={name}>
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
  classes: PropTypes.shape({
    button: PropTypes.string.isRequired,
    buttonIcon: PropTypes.string.isRequired
  }).isRequired
};

PaperDropzone.defaultProps = {
  multiple: false
};

export default withStyles(styles)(PaperDropzone);
