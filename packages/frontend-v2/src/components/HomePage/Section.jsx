import React from "react";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";
import classnames from "classnames";

export const Section = ({
  title,
  action: Action,
  className,
  children,
  ...props
}) => (
  <Container className={classnames("ds-section", className)} {...props}>
    {title && (
      <div className="d-flex justify-content-between mb-3">
        <h2>{title}</h2>
        <Action />
      </div>
    )}
    {children}
  </Container>
);

Section.propTypes = {
  title: PropTypes.string,
  action: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

Section.defaultProps = {
  action: () => null
};
