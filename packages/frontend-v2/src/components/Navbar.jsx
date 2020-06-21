import React from "react";

import {
  Navbar as BootstrapNavbar,
  Nav,
  Container,
  Button
} from "react-bootstrap";

export const Navbar = () => (
  <BootstrapNavbar expand="lg" bg="dark" variant="dark">
    <Container>
      <BootstrapNavbar.Brand href="#home">
        D's Construction
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle />
      <BootstrapNavbar.Collapse className="justify-content-end">
        <Nav>
          <Button variant="outline-light" className="mr-2">
            Home
          </Button>
          <Button variant="outline-light" className="mr-2">
            Photo Gallery
          </Button>
          <Button variant="outline-light">Contact</Button>
        </Nav>
      </BootstrapNavbar.Collapse>
    </Container>
  </BootstrapNavbar>
);
