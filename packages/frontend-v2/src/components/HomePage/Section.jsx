import React from "react";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";
import classnames from "classnames";

import { Spinner } from "components/Spinner";

export const Section = ({
  title,
  action: Action,
  isLoading,
  className,
  children,
  ...props
}) => (
  <Container className={classnames("ds-section", className)} {...props}>
    {title && (
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex flex-row align-items-center">
          <h2 className="mb-0">{title}</h2>
          {isLoading && <Spinner className="ml-3" />}
        </div>
        <Action />
      </div>
    )}
    {!isLoading && <>{children}</>}
  </Container>
);

Section.propTypes = {
  title: PropTypes.string,
  action: PropTypes.func,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

Section.defaultProps = {
  action: () => null,
  isLoading: false
};
