import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const IconButton = ({ icon, children, ...props }) => (
  <Button {...props}>
    {children}
    <FontAwesomeIcon className="ml-3" icon={icon} />
  </Button>
);

IconButton.propTypes = {
  icon: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};
