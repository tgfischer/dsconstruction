import React from "react";
import PropTypes from "prop-types";
import { Row, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const IconAlert = ({ icon, children, ...props }) => (
  <Alert as={Row} {...props}>
    <div className="d-flex flex-row">
      <div className="d-flex align-items-center justify-content-center ml-1 mr-4">
        <FontAwesomeIcon className="h4 mb-0" icon={icon} />
      </div>
      <div>{children}</div>
    </div>
  </Alert>
);

IconAlert.propTypes = {
  icon: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};
