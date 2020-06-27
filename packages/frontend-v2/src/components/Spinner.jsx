import React from "react";
import PropTypes from "prop-types";
import { Spinner as BootstrapSpinner } from "react-bootstrap";
import classnames from "classnames";

export const Spinner = ({ isCentered, className, ...props }) => (
  <div
    className={classnames("d-flex", className, {
      "justify-content-center align-items-center": isCentered
    })}
  >
    <BootstrapSpinner animation="border" role="status" {...props}>
      <span className="sr-only">Loading...</span>
    </BootstrapSpinner>
  </div>
);

Spinner.propTypes = {
  isCentered: PropTypes.bool,
  className: PropTypes.string
};

Spinner.defaultProps = {
  isCentered: false
};
