import React from "react";
import PropTypes from "prop-types";

import { IconButton } from "components/IconButton";
import { Spinner } from "components/Spinner";

export const FormSubmitButton = ({ icon, isSubmitting, isValid, children }) => (
  <div className="d-flex align-items-center">
    <IconButton type="submit" icon={icon} disabled={isSubmitting || !isValid}>
      {children}
    </IconButton>
    {isSubmitting && <Spinner className="ml-3" size="sm" />}
  </div>
);

FormSubmitButton.propTypes = {
  icon: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  isValid: PropTypes.bool,
  children: PropTypes.node.isRequired
};

FormSubmitButton.defaultProps = {
  isValid: true
};
