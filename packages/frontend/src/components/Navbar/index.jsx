import React from "react";
import PropTypes from "prop-types";
import {
  Navbar as BootstrapNavbar,
  Nav,
  Container,
  Button
} from "react-bootstrap";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useNavbar } from "./hooks";

export * from "./constants";

export const Navbar = ({ variant, className }) => {
  const { social, links, buttons } = useNavbar();
  return (
    <BootstrapNavbar
      className={classnames(
        { "bg-transparent": variant === "transparent" },
        className
      )}
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Container>
        <BootstrapNavbar.Brand href="#home">
          <img
            src="/images/logo.svg"
            width="60"
            height="60"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle />
        <BootstrapNavbar.Collapse className="justify-content-end">
          <Nav>
            {links.map(
              ({ displayName, url, isActive, isVisible, variant }) =>
                isVisible && (
                  <Button
                    key={url}
                    as={Link}
                    to={url}
                    className="mr-2"
                    variant={variant}
                    active={isActive}
                  >
                    {displayName}
                  </Button>
                )
            )}
            {social.map(({ icon, url }) => (
              <Button
                key={url}
                as="a"
                href={url}
                className="mr-2"
                variant="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={icon} size="lg" />
              </Button>
            ))}
            {buttons.map(
              ({ displayName, action, isVisible }) =>
                isVisible && (
                  <Button
                    key={displayName}
                    className="mr-2"
                    variant="outline-light"
                    onClick={action}
                  >
                    {displayName}
                  </Button>
                )
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

Navbar.propTypes = {
  variant: PropTypes.oneOf(["transparent", "dark"]),
  className: PropTypes.string
};

Navbar.defaultProps = {
  variant: "transparent"
};
