import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

import StyledLink from "./StyledLink";

const ButtonLink = ({ to, children, ...props }) => (
  <StyledLink to={to}>
    <Button {...props}>{children}</Button>
  </StyledLink>
);

ButtonLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default ButtonLink;
