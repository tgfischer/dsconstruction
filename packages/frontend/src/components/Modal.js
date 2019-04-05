import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  content: {
    paddingTop: theme.spacing.unit
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
  classes
}) => (
  <Dialog open={isOpen} onClose={onClose} maxWidth={maxWidth} fullWidth>
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
  isLoading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  maxWidth: PropTypes.oneOf(["sm", "md", "lg"]),
  classes: PropTypes.shape({
    content: PropTypes.string.isRequired
  }).isRequired
};

Modal.defaultProps = {
  maxWidth: "md"
};

export default withStyles(styles)(Modal);
