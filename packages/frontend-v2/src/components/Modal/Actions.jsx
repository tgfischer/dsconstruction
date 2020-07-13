import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

import { Spinner } from "components/Spinner";

export const Actions = ({ cancelText, submitText, isSubmitting, onClose }) => (
  <div className="d-flex justify-content-end">
    {isSubmitting && <Spinner className="ml-3 align-items-center" size="sm" />}
    <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
      {cancelText}
    </Button>
    <Button type="submit" disabled={isSubmitting}>
      {submitText}
    </Button>
  </div>
);

Actions.propTypes = {
  cancelText: PropTypes.string,
  submitText: PropTypes.string,
  isSubmitting: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};

Actions.defaultProps = {
  cancelText: "Cancel",
  submitText: "Submit",
  isSubmitting: false
};
