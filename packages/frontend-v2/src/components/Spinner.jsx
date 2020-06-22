import React from "react";
import PropTypes from "prop-types";
import { Spinner as BootstrapSpinner } from "react-bootstrap";
import classnames from "classnames";

export const Spinner = ({ className }) => (
  <div
    className={classnames(
      "d-flex justify-content-center align-items-center",
      className
    )}
  >
    <BootstrapSpinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </BootstrapSpinner>
  </div>
);

Spinner.propTypes = {
  className: PropTypes.string
};
