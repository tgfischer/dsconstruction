import React, { Fragment } from "react";
import PropTypes from "prop-types";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

const ServiceDialog = ({ title, submitButton: SubmitButton, onCancel }) => (
  <Fragment>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>Hello, World!</DialogContentText>
    </DialogContent>
    <DialogActions>
      <SubmitButton />
      <Button onClick={onCancel}>Cancel</Button>
    </DialogActions>
  </Fragment>
);

ServiceDialog.propTypes = {
  title: PropTypes.string.isRequired,
  submitButton: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default ServiceDialog;
