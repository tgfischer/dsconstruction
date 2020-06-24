import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  CircularProgress
} from "@material-ui/core";

const styles = theme => ({
  content: {
    paddingTop: theme.spacing(1)
  }
});

const Modal = ({
  children,
  title,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  maxWidth,
  fullWidth,
  classes
}) => (
  <Dialog
    open={isOpen}
    onClose={onClose}
    maxWidth={maxWidth}
    fullWidth={fullWidth}
  >
    <DialogTitle>{title}</DialogTitle>
    <DialogContent className={classes.content}>{children}</DialogContent>
    <DialogActions>
      <Button
        variant="contained"
        color="primary"
        disabled={isLoading}
        onClick={onSubmit}
      >
        {isLoading && <CircularProgress size={20} color="secondary" />}
        {!isLoading && "Save"}
      </Button>
      <Button onClick={onClose}>Cancel</Button>
    </DialogActions>
  </Dialog>
);

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  maxWidth: PropTypes.oneOf(["sm", "md", "lg"]),
  fullWidth: PropTypes.bool,
  classes: PropTypes.shape({
    content: PropTypes.string.isRequired
  }).isRequired
};

Modal.defaultProps = {
  fullWidth: false,
  isLoading: false
};

export default withStyles(styles)(Modal);