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

import { useUser } from "hooks/useUser";

export const Navbar = ({ variant, className }) => {
  const { isLoggedIn, clearUser } = useUser();
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
            <Button as={Link} to="/" className="mr-2" variant="link">
              Home
            </Button>
            <Button
              as={Link}
              to="/gallery?page=0&size=12"
              className="mr-2"
              variant="link"
            >
              Photo Gallery
            </Button>
            <Button as={Link} to="/contact" className="mr-2" variant="link">
              Contact
            </Button>
            {isLoggedIn && (
              <Button as={Link} to="/dashboard" className="mr-2" variant="link">
                Dashboard
              </Button>
            )}
            {!isLoggedIn && (
              <Button
                as={Link}
                to="/login"
                className="mr-2"
                variant="outline-light"
              >
                Login
              </Button>
            )}
            {isLoggedIn && (
              <Button
                className="mr-2"
                variant="outline-light"
                onClick={clearUser}
              >
                Log out
              </Button>
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
