import React from "react";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";
import classnames from "classnames";

import { Spinner } from "components/Spinner";

export const Section = ({
  title,
  subtitle,
  action: Action,
  isLoading,
  isCentered,
  variant,
  className,
  children,
  ...props
}) => (
  <div className={classnames("ds-section", variant)} {...props}>
    <Container className={className}>
      {title && (
        <div
          className={classnames("d-flex align-items-center mb-3", {
            "justify-content-between": !isCentered,
            "justify-content-center": isCentered
          })}
        >
          <div className="d-flex flex-row align-items-center">
            <span className="h2 mb-0">{title}</span>
            {isLoading && <Spinner className="ml-3" />}
          </div>
          <Action />
        </div>
      )}
      {subtitle && (
        <div
          className={classnames("d-flex align-items-center mb-5", {
            "justify-content-center": isCentered
          })}
        >
          <p className="lead">{subtitle}</p>
        </div>
      )}
      {!isLoading && <>{children}</>}
    </Container>
  </div>
);

Section.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  action: PropTypes.func,
  isLoading: PropTypes.bool,
  isCentered: PropTypes.bool,
  className: PropTypes.string,
  variant: PropTypes.oneOf(["light", "dark"]),
  children: PropTypes.node.isRequired
};

Section.defaultProps = {
  action: () => null,
  variant: "light",
  isLoading: false,
  isCentered: false
};
