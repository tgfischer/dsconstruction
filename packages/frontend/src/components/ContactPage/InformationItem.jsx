import React from "react";
import PropTypes from "prop-types";
import { Media } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const InformationItem = ({ icon, children }) => (
  <Media className="align-items-center mb-2">
    <FontAwesomeIcon className="h4 mr-3 mb-0" icon={icon} />
    <Media.Body>{children}</Media.Body>
  </Media>
);

InformationItem.propTypes = {
  icon: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};
