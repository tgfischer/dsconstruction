import React from "react";
import PropTypes from "prop-types";
import { Row, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const IconAlert = ({ icon, children, ...props }) => (
  <Alert as={Row} {...props}>
    <div className="d-flex flex-row">
      <FontAwesomeIcon className="h4 mb-0 ml-1 mr-4" icon={icon} />
      <div>{children}</div>
    </div>
  </Alert>
);

IconAlert.propTypes = {
  icon: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};
