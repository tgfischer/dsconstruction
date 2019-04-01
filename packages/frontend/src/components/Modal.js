import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

const Modal = ({
  children,
  title,
  isOpen,
  onClose,
  submitButton: SubmitButton
}) => (
  <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>{children}</DialogContent>
    <DialogActions>
      <SubmitButton />
      <Button onClick={onClose}>Cancel</Button>
    </DialogActions>
  </Dialog>
);

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  submitButton: PropTypes.func.isRequired
};

export default Modal;
